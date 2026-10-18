import type { Knex } from 'knex';
import DatabaseConnection from '../database/connection/DatabaseConnection.js';
import type {
    PublicIdParams,
} from '../interfaces/vaquinhaRifaInterface.js';
import type { CreateVaquinhaDTO, VaquinhaResponse } from '../interfaces/vaquinhaInterface.js';
import { AppError } from '../utils/appError.js';
import { retornaID } from '../utils/RetornaID.js';

interface VaquinhaRecord {
    id: number;
    organizer_id: number;
}

export class VaquinhaService {
    static async create(
        dados: Omit<CreateVaquinhaDTO, 'organizer_id'>,
        userPublicId: string
    ): Promise<VaquinhaResponse> {
        const organizerId = Number(await retornaID('users', userPublicId));
        if (!Number.isInteger(organizerId) || organizerId <= 0) {
            throw new AppError('Usuário não encontrado', 401);
        }

        const db = DatabaseConnection.getInstance();

        return await db.transaction(async (trx) => {
            const isPublic = dados.visibility.toLowerCase() !== 'privada';

            const [campanha] = await trx('campaigns')
                .insert({
                    title: dados.name,
                    description: dados.description ?? null,
                    pix_key: dados.pix_key,
                    ispublic: isPublic,
                    status: 'ativa',
                    category: dados.category,
                    start_date: dados.start_date,
                    end_date: dados.end_date,
                    type: 'crowdfundings',
                    organizer_id: organizerId,
                })
                .returning([
                    'id',
                    'public_id',
                    'title',
                    'description',
                    'pix_key',
                    'ispublic',
                    'status',
                    'category',
                    'start_date',
                    'end_date',
                    'type',
                    'organizer_id',
                    'created_at',
                ]);

            if (!campanha) {
                throw new AppError('Erro ao registrar a campanha da vaquinha', 500);
            }

            const [crowdfunding] = await trx('crowdfundings')
                .insert({
                    campaign_id: campanha.id,
                    raised_amount: dados.amount_collected,
                })
                .returning(['campaign_id', 'raised_amount']);

            if (dados.social_networks && dados.social_networks.length > 0) {
                await trx('social_networks').insert(
                    dados.social_networks.map((sn) => ({
                        user_id: organizerId,
                        platform: sn.platform,
                        url: sn.url,
                    }))
                );
            }

            return {
                campanha: {
                    id: Number(campanha.id),
                    public_id: String(campanha.public_id),
                    name: String(campanha.title),
                    visibility: campanha.ispublic ? 'publica' : 'privada',
                    pix_key: String(campanha.pix_key),
                    status: String(campanha.status),
                    vaquinha: {
                        amount_collected: Number(crowdfunding?.raised_amount ?? 0),
                    },
                },
            };
        });
    }

    static async listAll() {
        const db = DatabaseConnection.getInstance();

        const vaquinhas = await db('campaigns')
            .join('crowdfundings', 'campaigns.id', 'crowdfundings.campaign_id')
            .where('campaigns.type', 'crowdfundings')
            .select(
                'campaigns.public_id',
                'campaigns.title',
                'campaigns.description',
                'campaigns.pix_key',
                'campaigns.ispublic',
                'campaigns.status',
                'campaigns.category',
                'campaigns.start_date',
                'campaigns.end_date',
                'campaigns.type',
                'campaigns.created_at',
                'crowdfundings.raised_amount'
            );

        return vaquinhas.map((v) => ({
            public_id: String(v.public_id),
            name: String(v.title),
            visibility: v.ispublic ? 'publica' : 'privada',
            pix_key: String(v.pix_key),
            status: String(v.status),
            vaquinha: {
                amount_collected: Number(v.raised_amount),
            },
        }));
    }

    static async delete(publicId: PublicIdParams['public_id'], userPublicId: string): Promise<void> {
        const id = await retornaID('campaigns', publicId);
        if (id === null) {
            throw new AppError('Vaquinha não encontrada', 404);
        }

        const userId = await retornaID('users', userPublicId);
        if (userId === null) {
            throw new AppError('Usuário não encontrado', 401);
        }

        const db = DatabaseConnection.getInstance();

        await db.transaction(async (trx: Knex.Transaction) => {
            const vaquinha = await trx<VaquinhaRecord>('campaigns')
                .join('crowdfundings', 'crowdfundings.campaign_id', 'campaigns.id')
                .where('campaigns.id', id)
                .andWhere('campaigns.type', 'crowdfundings')
                .select({
                    id: 'campaigns.id',
                    organizer_id: 'campaigns.organizer_id',
                })
                .forUpdate()
                .first();

            if (!vaquinha) {
                throw new AppError('Vaquinha não encontrada', 404);
            }

            if (vaquinha.organizer_id !== Number(userId)) {
                throw new AppError('Não autorizado', 403);
            }

            // Comprovantes não são apagados junto com a vaquinha.
            const comprovante = await trx('receipts')
                .where({ campaigns_id: id })
                .first('id');

            if (comprovante) {
                throw new AppError(
                    'Vaquinha possui comprovantes de pagamento e não pode ser excluída',
                    409
                );
            }

            // crowdfundings e registrations são removidos via ON DELETE CASCADE.
            await trx('campaigns').where({ id }).del();
        });
    }
}
import DatabaseConnection from '../database/connection/DatabaseConnection.js';
import type { CreateVaquinhaDTO, VaquinhaResponse } from '../interfaces/vaquinhaInterface.js';
import { AppError } from '../utils/appError.js';

export class VaquinhaService {
    static async create(dados: CreateVaquinhaDTO): Promise<VaquinhaResponse> {
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
                    organizer_id: dados.organizer_id,
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
                        user_id: dados.organizer_id,
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
                'campaigns.id',
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
                'campaigns.organizer_id',
                'campaigns.created_at',
                'crowdfundings.raised_amount'
            );

        return vaquinhas.map((v) => ({
            id: Number(v.id),
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
}

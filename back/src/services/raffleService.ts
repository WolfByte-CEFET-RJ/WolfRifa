import type { Knex } from 'knex';
import DatabaseConnection from '../database/connection/DatabaseConnection.js';
import { AppError } from '../utils/appError.js';
import { retornaID } from '../utils/RetornaID.js';
import type {
    PublicIdParams,
    UpdateVaquinhaRifaDTO,
    VaquinhaRifaServiceResponse,
} from '../interfaces/vaquinhaRifaInterface.js';

interface RaffleRecord {
    id: number;
    organizer_id: number;
}

export class RaffleService {
    static async delete(publicId: PublicIdParams['public_id'], userId: number): Promise<void> {
        const id = await retornaID('campaigns', publicId);
        if (id === null) {
            throw new AppError('Rifa não encontrada', 404);
        }

        const db = DatabaseConnection.getInstance();

        await db.transaction(async (trx: Knex.Transaction) => {
            const rifa = await trx<RaffleRecord>('campaigns')
                .join('raffles', 'raffles.campaign_id', 'campaigns.id')
                .where('campaigns.id', id)
                .andWhere('campaigns.type', 'raffles')
                .select({
                    id: 'campaigns.id',
                    organizer_id: 'campaigns.organizer_id',
                })
                .forUpdate()
                .first();

            if (!rifa) {
                throw new AppError('Rifa não encontrada', 404);
            }

            if (rifa.organizer_id !== userId) {
                throw new AppError('Não autorizado', 403);
            }

            // receipts.campaigns_id não tem ON DELETE CASCADE: comprovantes de pagamento não são apagados junto com a rifa
            const comprovante = await trx('receipts').where({ campaigns_id: id }).first('id');
            if (comprovante) {
                throw new AppError('Rifa possui comprovantes de pagamento e não pode ser excluída', 409);
            }

            // raffles e registrations são removidos via ON DELETE CASCADE
            await trx('campaigns').where({ id }).del();
        });
    }
  
    static async update(
        publicId: PublicIdParams['public_id'],
        userId: number,
        changes: UpdateVaquinhaRifaDTO
    ): Promise<VaquinhaRifaServiceResponse> {
        if (changes.amount_collected !== undefined || changes.social_networks !== undefined) {
            throw new AppError(
                'Meta de arrecadação e redes sociais não são campos de atualização de rifa',
                400
            );
        }

        const id = await retornaID('campaigns', publicId);
        if (id === null) {
            throw new AppError('Rifa não encontrada', 404);
        }

        const db = DatabaseConnection.getInstance();

        return db.transaction(async (trx: Knex.Transaction) => {
            const rifa = await trx<RaffleRecord>('campaigns')
                .join('raffles', 'raffles.campaign_id', 'campaigns.id')
                .where('campaigns.id', id)
                .andWhere('campaigns.type', 'raffles')
                .select({
                    id: 'campaigns.id',
                    organizer_id: 'campaigns.organizer_id',
                    status: 'campaigns.status',
                    name: 'campaigns.title',
                    award: 'raffles.prize',
                })
                .first();

            if (!rifa) {
                throw new AppError('Rifa não encontrada', 404);
            }

            if (rifa.organizer_id !== userId) {
                throw new AppError('Não autorizado', 403);
            }

            const updatedAt = new Date();
            const campaignChanges: Record<string, string | boolean | Date | null> = { updated_at: updatedAt };
            const raffleChanges: Record<string, string | Date> = { updated_at: updatedAt };

            if (changes.name !== undefined) campaignChanges.title = changes.name;
            if (changes.description !== undefined) campaignChanges.description = changes.description;
            if (changes.visibility !== undefined) campaignChanges.ispublic = changes.visibility !== 'privada';
            if (changes.pix_key !== undefined) campaignChanges.pix_key = changes.pix_key;
            if (changes.start_date !== undefined) campaignChanges.start_date = changes.start_date;
            if (changes.end_date !== undefined) campaignChanges.end_date = changes.end_date;
            if (changes.category !== undefined) campaignChanges.category = changes.category;
            if (changes.award !== undefined) raffleChanges.prize = changes.award;
            if (changes.local !== undefined) raffleChanges.location = changes.local;

            await trx('campaigns').where({ id }).update(campaignChanges);
            if (changes.award !== undefined || changes.local !== undefined) {
                await trx('raffles').where({ campaign_id: id }).update(raffleChanges);
            }

            const updatedRaffle = await trx<VaquinhaRifaServiceResponse>('campaigns')
                .join('raffles', 'raffles.campaign_id', 'campaigns.id')
                .where('campaigns.id', id)
                .select({
                    id: 'campaigns.id',
                    name: 'campaigns.title',
                    award: 'raffles.prize',
                    status: 'campaigns.status',
                })
                .first();

            if (!updatedRaffle) {
                throw new AppError('Rifa não encontrada', 404);
            }
            return updatedRaffle;
        });
    }
}

import type { Knex } from 'knex';
import DatabaseConnection from '../database/connection/DatabaseConnection.js';
import { AppError } from '../utils/appError.js';
import type { UpdateRaffleInput } from '../yup/raffleYup.js';

interface RaffleRecord {
    id: number;
    organizer_id: number;
    status: string;
    name: string;
    award: string;
}

interface UpdatedRaffle {
    id: number;
    name: string;
    award: string;
    status: string;
}

export class RaffleService {
    static async update(id: number, userId: number, changes: UpdateRaffleInput): Promise<UpdatedRaffle> {
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
            const campaignChanges: Record<string, string | Date> = { updated_at: updatedAt };
            const raffleChanges: Record<string, string | Date> = { updated_at: updatedAt };

            if (changes.name !== undefined) campaignChanges.title = changes.name;
            if (changes.description !== undefined) campaignChanges.description = changes.description;
            if (changes.end_date !== undefined) campaignChanges.end_date = changes.end_date;
            if (changes.award !== undefined) raffleChanges.prize = changes.award;
            if (changes.local !== undefined) raffleChanges.location = changes.local;

            await trx('campaigns').where({ id }).update(campaignChanges);
            await trx('raffles').where({ campaign_id: id }).update(raffleChanges);

            const updatedRaffle = await trx<UpdatedRaffle>('campaigns')
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

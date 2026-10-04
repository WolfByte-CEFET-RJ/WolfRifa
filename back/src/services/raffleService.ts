import type { Knex } from 'knex';
import DatabaseConnection from '../database/connection/DatabaseConnection.js';
import { AppError } from '../utils/appError.js';

interface RaffleRecord {
    id: number;
    organizer_id: number;
}

export class RaffleService {
    static async delete(id: number, userId: number): Promise<void> {
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
}

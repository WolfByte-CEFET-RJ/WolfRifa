import type { Knex } from 'knex';
import DatabaseConnection from '../database/connection/DatabaseConnection.js';
import { AppError } from '../utils/appError.js';

interface VaquinhaRecord {
    id: number;
    organizer_id: number;
}

export class VaquinhaService {
    static async delete(id: number, userId: number): Promise<void> {
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

            if (vaquinha.organizer_id !== userId) {
                throw new AppError('Não autorizado', 403);
            }

            // receipts.campaigns_id não tem ON DELETE CASCADE: comprovantes de pagamento não são apagados junto com a vaquinha
            const comprovante = await trx('receipts').where({ campaigns_id: id }).first('id');
            if (comprovante) {
                throw new AppError('Vaquinha possui comprovantes de pagamento e não pode ser excluída', 409);
            }

            // crowdfundings e registrations são removidos via ON DELETE CASCADE
            await trx('campaigns').where({ id }).del();
        });
    }
}

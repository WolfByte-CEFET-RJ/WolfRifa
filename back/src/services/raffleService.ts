import { randomUUID } from 'node:crypto';
import DatabaseConnection from '../database/connection/DatabaseConnection.js';
import type { CreateRaffleInput } from '../yup/raffleYup.js';

export class RaffleService {
    static async create(input: CreateRaffleInput, organizerPublicId: string) {
        const db = DatabaseConnection.getInstance();
        return db.transaction(async trx => {
            const organizer = await trx('users').where({ public_id: organizerPublicId }).first('id');
            if (!organizer) return null;

            const [campaign] = await trx('campaigns').insert({
                public_id: randomUUID(),
                title: input.name,
                description: input.description ?? null,
                pix_key: input.key_pix,
                ispublic: input.visibility === 'public',
                status: 'ativa',
                category: 'general',
                start_date: input.start_date,
                end_date: input.end_date,
                type: 'raffles',
                organizer_id: organizer.id,
            }).returning(['id', 'public_id', 'title', 'status']);

            await trx('raffles').insert({
                campaign_id: campaign.id,
                prize: input.award,
                location: input.local,
                participants_qtd: input.participants_qtd,
            });
            if (input.social_networks?.length) {
                await trx('campaign_social_networks').insert(input.social_networks.map(network => ({
                    campaign_id: campaign.id,
                    platform: network.platform,
                    url: network.url,
                })));
            }
            return {
                Campanha: {
                    id: campaign.id,
                    public_id: campaign.public_id,
                    name: campaign.title,
                    status: campaign.status,
                    rifa: { award: input.award, local: input.local, participants_qtd: input.participants_qtd },
                },
            };
        });
    }
}

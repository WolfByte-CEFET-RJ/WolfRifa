import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("registrations").del();
    await knex("registrations")
        .insert([
            {
                id: 1,
                public_id: "00000000-0000-4000-8000-000000000201",
                user_id: 2,
                campaign_id: 1,
                notification_sent: true,
            },
            {
                id: 2,
                public_id: "00000000-0000-4000-8000-000000000202",
                user_id: 3,
                campaign_id: 1,
                notification_sent: false,
            },
            {
                id: 3,
                public_id: "00000000-0000-4000-8000-000000000203",
                user_id: 1,
                campaign_id: 2,
                notification_sent: true,
            },
        ])
        .onConflict("id")
        .merge(["user_id", "campaign_id", "notification_sent"]);
}

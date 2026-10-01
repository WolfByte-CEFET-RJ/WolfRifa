import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("crowdfundings").del();
    await knex("crowdfundings")
        .insert({ campaign_id: 1, raised_amount: 1250.5 })
        .onConflict("campaign_id")
        .merge(["raised_amount"]);
}

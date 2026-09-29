import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("raffles")
        .insert({
            campaign_id: 2,
            location: "Centro Comunitário WolfRifa",
            prize: "Cesta de produtos artesanais",
        })
        .onConflict("campaign_id")
        .merge(["location", "prize"]);
}

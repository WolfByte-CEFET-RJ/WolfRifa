import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("social_networks").del();
    await knex("social_networks").insert([
        {
            id: 1,
            user_id: 1,
            platform: "instagram",
            url: "https://instagram.com/ana.souza",
        },
        {
            id: 2,
            user_id: 2,
            platform: "facebook",
            url: "https://facebook.com/bruno.lima",
        },
        {
            id: 3,
            user_id: 3,
            platform: "youtube",
            url: "https://youtube.com/@carla.mendes",
        },
    ])
    .onConflict("id")
    .merge(["user_id", "platform", "url"]);
}

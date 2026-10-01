import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();
    await knex("users")
        .insert([
            {
                id: 1,
                public_id: "00000000-0000-4000-8000-000000000001",
                name: "Ana Souza",
                email: "ana.souza@example.com",
                phone_number: "5511999990001",
                password: "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
            },
            {
                id: 2,
                public_id: "00000000-0000-4000-8000-000000000002",
                name: "Bruno Lima",
                email: "bruno.lima@example.com",
                phone_number: "5511999990002",
                password: "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
            },
            {
                id: 3,
                public_id: "00000000-0000-4000-8000-000000000003",
                name: "Carla Mendes",
                email: "carla.mendes@example.com",
                phone_number: "5511999990003",
                password: "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
            },
        ])
        .onConflict("id")
        .merge(["name", "email", "phone_number", "password"]);
}

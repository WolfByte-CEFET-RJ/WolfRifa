import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // 1. Limpa as tabelas com chaves estrangeiras primeiro
    await knex("receipts").del();
    await knex("raffles").del();
    await knex("crowdfundings").del();
    await knex("campaigns").del();
    await knex("users").del();

    const passwordHash = "$2b$10$H9moC5L3O1LSav1BG7EIgOQDKONZGU0IEI3grFxn4/8cDdRMoPAg6";

    // 2. Insere os usuários com o hash gerado pelo seu ambiente
    await knex("users")
        .insert([
            {
                id: 1,
                public_id: "00000000-0000-4000-8000-000000000001",
                name: "Ana Souza",
                email: "ana.souza@example.com",
                phone_number: "5511999990001",
                password: passwordHash,
            },
            {
                id: 2,
                public_id: "00000000-0000-4000-8000-000000000002",
                name: "Bruno Lima",
                email: "bruno.lima@example.com",
                phone_number: "5511999990002",
                password: passwordHash,
            },
            {
                id: 3,
                public_id: "00000000-0000-4000-8000-000000000003",
                name: "Carla Mendes",
                email: "carla.mendes@example.com",
                phone_number: "5511999990003",
                password: passwordHash,
            },
        ])
        .onConflict("id")
        .merge(["name", "email", "phone_number", "password"]);
}
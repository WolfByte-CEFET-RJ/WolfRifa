import type { Knex } from "knex";
import 'dotenv/config';
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
    // 1. Limpa as tabelas com chaves estrangeiras primeiro
    await knex("receipts").del();
    await knex("raffles").del();
    await knex("crowdfundings").del();
    await knex("campaigns").del();
    await knex("users").del();

    const SEED_TESTE_PASSWORD = process.env.SEED_TESTE_PASSWORD || "Senha@123"; //senha das seeds testes
    const passwordHash = await bcrypt.hash(SEED_TESTE_PASSWORD, 10);

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
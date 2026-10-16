import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("receipts").del();
    await knex("receipts")
        .insert([
            {
                id: 1,
                campaigns_id: 1,
                sender: "João Silva",
                recipient: "biblioteca@example.com",
                institution: 260,
                amount: 50.00,
                created_at: "2026-09-10",
                quota_count: 5,
                status: "approved",
            },
            {
                id: 2,
                campaigns_id: 1,
                sender: "Maria Santos",
                recipient: "biblioteca@example.com",
                institution: 341,
                amount: 100.00,
                created_at: "2026-09-15",
                quota_count: 10,
                status: "pending",
            },
            {
                id: 3,
                campaigns_id: 1,
                sender: "Carlos Oliveira",
                recipient: "biblioteca@example.com",
                institution: 1,
                amount: 25.00,
                created_at: "2026-09-20",
                quota_count: 2,
                status: "rejected",
            },
            {
                id: 4,
                campaigns_id: 2,
                sender: "Ana Costa",
                recipient: "resgate@example.com",
                institution: 260,
                amount: 40.00,
                created_at: "2026-09-18",
                quota_count: 4,
                status: "approved",
            },
            {
                id: 5,
                campaigns_id: 2,
                sender: "Pedro Souza",
                recipient: "resgate@example.com",
                institution: 104,
                amount: 80.00,
                created_at: "2026-09-22",
                quota_count: 8,
                status: "pending",
            },
            {
                id: 6,
                campaigns_id: 2,
                sender: "Lucas Ferreira",
                recipient: "resgate@example.com",
                institution: 341,
                amount: 20.00,
                created_at: "2026-09-25",
                quota_count: 2,
                status: "rejected",
            },
        ])
        .onConflict("id")
        .merge();
}
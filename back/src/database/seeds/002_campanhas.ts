import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("campaigns").del();
    await knex("campaigns")
        .insert([
            {
                id: 1,
                public_id: "00000000-0000-4000-8000-000000000101",
                title: "Ajude a construir a biblioteca comunitária",
                description: "Campanha para comprar livros e estantes para a biblioteca do bairro.",
                pix_key: "biblioteca@example.com",
                ispublic: true,
                status: "active",
                category: "education",
                start_date: "2026-09-01",
                end_date: "2026-12-31",
                type: "crowdfundings",
                organizer_id: 1,
            },
            {
                id: 2,
                public_id: "00000000-0000-4000-8000-000000000102",
                title: "Rifa solidária para tratamento veterinário",
                description: "Arrecadação para o tratamento de animais resgatados.",
                pix_key: "resgate@example.com",
                ispublic: true,
                status: "active",
                category: "animals",
                start_date: "2026-09-15",
                end_date: "2026-11-30",
                type: "raffles",
                organizer_id: 2,
            },
        ])
        .onConflict("id")
        .merge();
}

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("receipts", (table: Knex.CreateTableBuilder) => {
        table.increments("id").primary();
        table.string("sender", 255).notNullable();
        table.string("recipient", 255).notNullable();
        table.integer("institution").notNullable();
        table.decimal("amount", 10, 2).notNullable();
        table.date("created_at").notNullable();
        table.integer("quota_count").notNullable();
        table.enum("status", ["pending", "approved", "rejected"]).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("receipts");
}


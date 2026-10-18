import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("receipts", (table: Knex.CreateTableBuilder) => {
        table.increments("id").primary();
        table.integer('campaigns_id').notNullable().references('id').inTable('campaigns')
        table.string("sender", 255).notNullable();
        table.string("recipient", 255).notNullable();
        table.integer("institution").notNullable();
        table.decimal("amount", 10, 2).notNullable();
        table.timestamp("created_at").notNullable();
        table.timestamp('updated_at').nullable();
        table.integer("quota_count").notNullable();
        table.enum("status", ["pending", "approved", "rejected"]).notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("receipts");
}




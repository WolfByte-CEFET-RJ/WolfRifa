import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("public_id", 36).notNullable().unique();
        table.string("name", 255).notNullable();
        table.string("email", 255).notNullable().unique();
        table.string("phone_number", 13).notNullable().unique();
        table.string("password", 255).notNullable();
        table.datetime("created_at").defaultTo(knex.fn.now());
        table.datetime("updated_at").nullable();

    });
}

export async function down(knex: Knex): Promise<void> {
    
    return knex.schema.dropTableIfExists("users");

}
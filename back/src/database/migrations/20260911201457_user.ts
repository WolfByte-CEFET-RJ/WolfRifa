import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table: Knex.CreateTableBuilder) => {
        table.increments('id').primary();
        table.string('public_id', 36).notNullable().unique();
        table.string('name').notNullable();
        table.string('cellphone_number').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}


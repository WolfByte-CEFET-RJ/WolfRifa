import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('social_networks', (table: Knex.CreateTableBuilder) => {
        table.increments('id').primary();
        table.string('public_id', 36).notNullable().unique();
        table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.enum('platform', ['instagram', 'facebook', 'tiktok', 'youtube', 'x', 'other']).notNullable();
        table.text('url').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('social_networks');
}


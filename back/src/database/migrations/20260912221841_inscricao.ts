import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('registrations', (table: Knex.CreateTableBuilder) => {
        table.increments('id').primary();
        table.uuid('public_id').notNullable().unique();
        table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('campaign_id').notNullable().references('id').inTable('campaigns').onDelete('CASCADE');
        table.boolean('notification_sent').defaultTo(false);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('registrations');
}


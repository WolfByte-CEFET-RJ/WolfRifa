import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('raffles', table => {
        table.integer('participants_qtd').nullable();
    });
    await knex.raw('ALTER TABLE raffles ADD CONSTRAINT raffles_participants_qtd_positive CHECK (participants_qtd > 0)');
    await knex.schema.createTable('campaign_social_networks', table => {
        table.increments('id').primary();
        table.integer('campaign_id').notNullable().references('id').inTable('campaigns').onDelete('CASCADE');
        table.enum('platform', ['instagram', 'facebook', 'tiktok', 'youtube', 'x', 'other']).notNullable();
        table.text('url').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('campaign_social_networks');
    await knex.schema.alterTable('raffles', table => {
        table.dropColumn('participants_qtd');
    });
}

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('campaigns', (table) => {
        table.timestamp('updated_at').nullable();
    });

    await knex.schema.alterTable('raffles', (table) => {
        table.timestamp('updated_at').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('raffles', (table) => {
        table.dropColumn('updated_at');
    });

    await knex.schema.alterTable('campaigns', (table) => {
        table.dropColumn('updated_at');
    });
}

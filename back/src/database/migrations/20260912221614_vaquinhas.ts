import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("crowdfundings", (table) => {    
    table.integer("campaign_id").primary().unsigned().notNullable().references("id").inTable("campaigns").onDelete("CASCADE");

    table.decimal("raised_amount", 10, 2).defaultTo(0.00);

    });
}

export async function down(knex: Knex): Promise<void> {

    return knex.schema.dropTableIfExists("crowdfundings");

}
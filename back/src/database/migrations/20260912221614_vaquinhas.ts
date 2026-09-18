

import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("crowdfundings", (table) => {
    table.increments("id").primary();
    
    
    table.decimal("raised_amount", 10, 2).defaultTo(0.00);

    table.integer("campaign_id").unsigned().notNullable().references("id").inTable("campaigns").onDelete("CASCADE");

  });
}

export async function down(knex: Knex): Promise<void> {

  return knex.schema.dropTableIfExists("crowdfundings");
  
}
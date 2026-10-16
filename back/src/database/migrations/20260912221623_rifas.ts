import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("raffles", (table) => {
    table.integer("campaign_id").primary().unsigned().notNullable().references("id").inTable("campaigns").onDelete("CASCADE");
    table.string("location", 255).notNullable();
    table.string("prize", 255).notNullable(); 

  });
}

export async function down(knex: Knex): Promise<void> {

  return knex.schema.dropTableIfExists("raffles");
  
}
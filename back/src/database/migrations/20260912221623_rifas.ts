import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("raffles", (table) => {
    table.increments("id").primary();
    table.string("location", 255).notNullable();
    table.string("prize", 255).notNullable(); 


    table.integer("campaign_id").unsigned().notNullable().references("id").inTable("campaigns").onDelete("CASCADE");

  });
}

export async function down(knex: Knex): Promise<void> {

  return knex.schema.dropTableIfExists("raffles");
  
}
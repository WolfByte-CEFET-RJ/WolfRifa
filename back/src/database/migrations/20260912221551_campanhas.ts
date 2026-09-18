import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("campaigns", (table: Knex.CreateTableBuilder) => {

    table.increments("id").primary();
    table.string("public_id", 36).notNullable().unique();
    table.string("title", 255).notNullable();
    table.text("description").nullable();
    table.string("pix_key", 255).notNullable();
    table.string("visibility", 20).notNullable(); 
    table.string("status", 20).notNullable();     
    table.string("category", 20).notNullable();   
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();

    table.integer("organizer_id").unsigned().notNullable().references("id").inTable("organizers").onDelete("CASCADE");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

}

export async function down(knex: Knex): Promise<void> {

  return knex.schema.dropTableIfExists("campaigns");

}
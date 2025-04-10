import type { Knex } from 'knex';


//See programm on vajalik, et API endpoint saaks siit andmeid võtta ja neid andmeid kasutada asjade arvutamisel
export async function up(knex: Knex): Promise<void> {
    //See loob tabeli, kus on id, ees, perenimi ja riik
    await knex.schema.createTable('customer', (table) => {
        table.uuid('id').primary().notNullable();
        table.text('first_name').notNullable();
        table.text('last_name').notNullable();
        table.text('country').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('customer');
}

import type { Knex } from 'knex';

//See programm on vajalik, et API endpoint saaks siit andmeid võtta ja neid andmeid kasutada asjade arvutamisel

export async function up(knex: Knex): Promise<void> {
    //Siin loob tabelikus on järgnevad veerud:
    await knex.schema.createTable('bet', (table) => {
        table.uuid('id')
            .primary()
            .notNullable()
            .defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('customer_id').references('id').inTable('customer');
        table.integer('stake').notNullable();
        table.decimal('odds').notNullable();
        table.text('status').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('bet');
}


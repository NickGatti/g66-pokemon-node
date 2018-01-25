exports.up = function ( knex, Promise ) {
    return knex.schema.createTable( 'pokemon', ( table ) => {
        table.increments()
        table.string( 'name' ).notNullable()
        table.integer( 'trainer_id' )
        table.integer( 'cp' )
        table.boolean( 'in_gym' ).notNullable()
    } )
};

exports.down = function ( knex, Promise ) {
    return knex.schema.dropTable( 'pokemon' )
};
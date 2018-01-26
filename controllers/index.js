const knex = require( "../db/knex.js" );

module.exports = {

    main: function ( req, res, next ) {
        res.redirect( '/pokemon' );
    },

    homePage: function ( req, res, next ) {
        knex( 'pokemon' ).then( ( pokemonData ) => {
            knex( 'trainers' ).then( ( trainerData ) => {
                res.render( 'index', {
                    title: 'Pokemon',
                    pokemon: pokemonData,
                    trainers: trainerData
                } );
            } )
        } )
    }

};
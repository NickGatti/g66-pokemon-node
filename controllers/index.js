const knex = require( "../db/knex.js" );

module.exports = {

    main: function ( req, res, next ) {
        res.redirect( '/pokemon' );
    },

    homePage: function ( req, res, next ) {
        knex( 'pokemon' ).then( ( pokemonData ) => {
            res.render( 'index', {
                title: 'Pokemon',
                pokemon: pokemonData
            } );
        } )
    }

};
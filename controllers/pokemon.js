const knex = require( "../db/knex.js" );

module.exports = {

    viewPokemon: function ( req, res, next ) {
        knex( 'pokemon' ).then( ( pokemonData ) => {
            knex( 'trainers' ).then( ( trainersData ) => {
                res.render( 'index', {
                    title: 'Add a Pokemon',
                    trainers: trainersData,
                    pokemon: pokemonData
                } );
            } )
        } )
    },

    addPokemon: function ( req, res, next ) {
        knex( 'pokemon' )
            .insert( {
                name: req.body.name,
                trainer_id: req.body.trainer_id,
                cp: req.body.cp,
                in_gym: req.body.in_gym
            } ).then( () => {
                res.redirect( '/home' );
            } )
    },

    showPokemon: function ( req, res, next ) {
        knex( 'pokemon' )
            .where( 'pokemon.id', req.params.id )
            .select( 'pokemon.name', 'pokemon.cp', 'pokemon.in_gym', 'trainers.name AS trainer_name' )
            .join( 'trainers', 'trainers.id', 'pokemon.trainer_id' )
            .then( ( pokemonData ) => {
                res.render( 'showPokemon', {
                    title: pokemonData[ 0 ].name,
                    pokemon: pokemonData[ 0 ]
                } )
            } )
    },

    editPokemon: function ( req, res, next ) {
        knex( 'pokemon' )
            .where( 'pokemon.id', req.params.id )
            .select( 'pokemon.id', 'pokemon.name', 'pokemon.cp', 'pokemon.in_gym', 'trainers.name AS trainer_name' )
            .join( 'trainers', 'trainers.id', 'pokemon.trainer_id' )
            .then( ( pokemonData ) => {
                knex( 'trainers' ).then( ( trainerData ) => {
                    res.render( 'editPokemon', {
                        title: pokemonData[ 0 ].name,
                        pokemon: pokemonData[ 0 ],
                        trainers: trainerData
                    } )
                } )
            } )
    },

    updatePokemon: function ( req, res, next ) {
        knex( 'pokemon' )
            .update( {
                name: req.body.name,
                trainer_id: req.body.trainer_id,
                cp: req.body.cp,
                in_gym: req.body.in_gym
            } )
            .where( 'id', req.params.id )
            .then( () => {
                res.redirect( `/pokemon/view/${req.params.id}` );
            } )
    },

    deletePokemon: function ( req, res, next ) {
        knex( 'pokemon' )
            .where( 'id', req.params.id )
            .del()
            .then( () => {
                res.redirect( '/pokemon' );
            } )
    },

};
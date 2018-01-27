const knex = require( "../db/knex.js" );

module.exports = {

    view: function ( req, res ) {
        knex( 'trainers' )
            .then( ( trainerData ) => {
                knex( 'pokemon' )
                    .then( ( pokemonData ) => {
                        res.render( 'trainers', {
                            title: 'Trainers',
                            trainers: trainerData,
                            pokemon: pokemonData,
                            gym: req.session.user.gym
                        } );
                    } )
            } )
    }

};
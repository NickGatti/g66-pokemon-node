const knex = require( "../db/knex.js" );

module.exports = {

    view: function ( req, res ) {
        knex( 'trainers' )
            .then( ( trainerData ) => {
                res.render( 'trainers', {
                    title: 'Trainers',
                    trainers: trainerData
                } );
            } )
    }

};
const knex = require( "../db/knex.js" );

function home( req, res ) {
    checkForFullGym( req )
    req.session.save( function () {
        res.redirect( '/pokemon' );
    } )
}

function checkForFullGym( req ) {
    if ( req.session.user.gym.p1.id && !req.session.user.gym.p2.id ) {
        req.session.user.gym.halfFull = true
    } else if ( req.session.user.gym.p2.id && !req.session.user.gym.p1.id ) {
        req.session.user.gym.halfFull = true
    } else {
        req.session.user.gym.halfFull = false
    }

    if ( req.session.user.gym.p1.id && req.session.user.gym.p2.id ) {
        req.session.user.gym.full = true
        req.session.user.gym.halfFull = false
    } else {
        req.session.user.gym.full = false
    }
}

module.exports = {

    assign: function ( req, res, next ) {
        if ( !req.session.user.gym.p1 ) {
            req.session.user.gym.p1 = {
                id: req.params.id
            }
            home( req, res )
            return
        } else if ( !req.session.user.gym.p2 && req.session.user.gym.p1.id != req.params.id ) {
            req.session.user.gym.p2 = {
                id: req.params.id
            }
            home( req, res )
            return
        }

        if ( !req.session.user.gym.p1.id ) {
            req.session.user.gym.p1 = {
                id: req.params.id
            }
            home( req, res )
            return
        } else if ( !req.session.user.gym.p2.id ) {
            req.session.user.gym.p2 = {
                id: req.params.id
            }
            home( req, res )
            return
        }

    },

    remove: function ( req, res, next ) {

        for ( let key in req.session.user.gym ) {

            if ( req.session.user.gym[ key ] ) {
                if ( req.session.user.gym[ key ].id == req.params.id ) {
                    req.session.user.gym[ key ].id = null
                }
            }
        }

        home( req, res )
    },

    home: function ( req, res, next ) {
        knex( 'pokemon' )
            .then( ( pokemonData ) => {
                res.render( 'gymHome', {
                    title: 'The Gym',
                    pokemon: pokemonData,
                    gym: req.session.user.gym,
                    actionFlag: true
                } );
            } )
    },

    homeAssign: function ( req, res, next ) {
        if ( req.body.pokemon1 === req.body.pokemon2 ) {
            knex( 'pokemon' )
                .then( ( pokemonData ) => {
                    res.render( 'gymHome', {
                        title: 'The Gym',
                        pokemon: pokemonData,
                        gym: req.session.user.gym,
                        actionFlag: false
                    } );
                } )
        } else if ( req.body.pokemon1 != req.body.pokemon2 ) {
            req.session.user.gym.p1.id = req.body.pokemon1
            req.session.user.gym.p2.id = req.body.pokemon2
            checkForFullGym( req )
            req.session.save( () => {
                res.redirect( '/gym/home' );
            } )
        }
    }

};
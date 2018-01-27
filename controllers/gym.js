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

function checkSession( req ) {
    if ( req.session ) {
        if ( req.session.user ) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
    return false
}

module.exports = {

    assign: function ( req, res, next ) {
        if ( !checkSession( req ) ) res.redirect( '/pokemon' );
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
        if ( !checkSession( req ) ) res.redirect( '/pokemon' );
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
        if ( !checkSession( req ) ) res.redirect( '/pokemon' );
        if ( req.session.user.gym.full ) {
            knex( 'pokemon' )
                .select( 'pokemon.id', 'pokemon.name', 'pokemon.cp', 'trainers.name AS trainer_name' )
                .join( 'trainers', 'trainers.id', 'pokemon.trainer_id' )
                .then( ( pokemonData ) => {

                    let output = []
                    for ( let key in req.session.user.gym ) {
                        for ( let i = 0; i < pokemonData.length; i++ ) {
                            if ( pokemonData[ i ].id == req.session.user.gym[ key ].id ) {
                                if ( output[ 0 ] ) {
                                    if ( output[ 0 ].id != pokemonData[ i ].id )
                                        output.push( {
                                            id: pokemonData[ i ].id,
                                            cp: pokemonData[ i ].cp
                                        } )
                                } else {
                                    output.push( {
                                        id: pokemonData[ i ].id,
                                        cp: pokemonData[ i ].cp
                                    } )
                                }
                            }
                        }
                    }

                    if ( output[ 0 ].cp > output[ 1 ].cp ) {
                        req.session.user.gym.winner = {
                            id: output[ 0 ].id,
                            cp: output[ 0 ].cp + 20
                        }
                    } else if ( output[ 0 ].cp == output[ 1 ].cp ) {
                        req.session.user.gym.winner = false
                    } else {
                        req.session.user.gym.winner = {
                            id: output[ 1 ].id,
                            cp: output[ 1 ].cp + 20
                        }
                    }

                    req.session.save( () => {
                        res.render( 'gymHome', {
                            title: 'The Gym',
                            pokemon: pokemonData,
                            gym: req.session.user.gym,
                            actionFlag: true
                        } );
                    } )
                } )
            return
        }

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
        if ( !checkSession( req ) ) res.redirect( '/pokemon' );
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
    },

    battle: function ( req, res, next ) {
        if ( !checkSession( req ) ) res.redirect( '/pokemon' );
        if ( !req.session.user.gym.winner ) return
        knex( 'pokemon' )
            .where( 'id', req.session.user.gym.winner.id )
            .update( {
                cp: req.session.user.gym.winner.cp
            } )
            .then( () => {

                console.log( 'here' );

                knex( 'pokemon' )
                    .select( 'pokemon.id', 'pokemon.name', 'pokemon.cp', 'trainers.name AS trainer_name' )
                    .join( 'trainers', 'trainers.id', 'pokemon.trainer_id' )
                    .then( ( pokemonData ) => {


                        req.session.user.gym.winner = 'show'

                        req.session.save( () => {
                            res.render( 'gymHome', {
                                title: 'The Gym',
                                pokemon: pokemonData,
                                gym: req.session.user.gym,
                                actionFlag: true
                            } );
                        } )
                    } )
            } )
    }

};
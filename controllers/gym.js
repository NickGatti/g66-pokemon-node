const knex = require( "../db/knex.js" );

function home( req, res ) {
    checkForFullGym( req )
    req.session.save( function () {
        res.redirect( '/pokemon' );
    } )
}

function checkForFullGym( req ) {
    if ( req.session.user.gym.p1 && req.session.user.gym.p2 ) {
        if ( req.session.user.gym.p1.id && req.session.user.gym.p2.id ) {
            req.session.user.gym.full = true
        } else {
            req.session.user.gym.full = false
        }
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

        if ( req.session.user.gym.p1 && req.session.user.gym.p2 ) {
            if ( req.session.user.gym.p1.id && req.session.user.gym.p2.id ) {
                req.session.user.gym.full = true
            } else {
                req.session.user.gym.full = false
            }
        }

        req.session.save( function () {
            res.redirect( '/pokemon' );
        } )

    }

};
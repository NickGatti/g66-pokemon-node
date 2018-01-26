const knex = require( "../db/knex.js" );

module.exports = {

    assign: function ( req, res, next ) {
        if ( !req.session.user.gym.p1 ) {
            req.session.user.gym.p1 = {
                id: req.params.id
            }
        } else if ( !req.session.user.gym.p2 && req.session.user.gym.p1.id != req.params.id ) {
            req.session.user.gym.p2 = {
                id: req.params.id
            }
        } else {
            req.session.user.gym.full = true
        }

        req.session.save( function () {
            res.redirect( '/pokemon' );
        } )
    }

};
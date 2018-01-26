const knex = require( "../db/knex.js" );

module.exports = {

    assign: function ( req, res, next ) {
        let saveSessionFlag = false

        if ( !req.session.user.gym.p1 ) {
            req.session.user.gym.p1 = {
                id: req.params.id
            }
            saveSessionFlag = true
        } else if ( !req.session.user.gym.p2 ) {
            req.session.user.gym.p2 = {
                id: req.params.id
            }
            saveSessionFlag = true
        } else {
            req.session.user.gym.full = true
        }

        if ( saveSessionFlag ) {

            req.session.save( function () {
                res.redirect( '/pokemon' );
            } )
        }
    }

};
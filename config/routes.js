//Update the name of the controller below and rename the file.
const index = require( "../controllers/index.js" );
const pokemon = require( "../controllers/pokemon.js" );
const gym = require( "../controllers/gym.js" );
const trainers = require( "../controllers/trainers.js" );

module.exports = function ( app ) {

    app.get( '/', index.main );

    app.get( '/home', index.homePage )

    app.get( '/pokemon', pokemon.viewPokemon )

    app.post( '/pokemon/add', pokemon.addPokemon )

    app.get( '/pokemon/view/:id', pokemon.showPokemon )

    app.get( '/pokemon/edit/:id', pokemon.editPokemon )

    app.post( '/pokemon/update/:id', pokemon.updatePokemon )

    app.post( '/pokemon/delete/:id', pokemon.deletePokemon )

    app.post( '/gym/assign/:id', gym.assign )

    app.post( '/gym/remove/:id', gym.remove )

    app.get( '/trainers', trainers.view )

    app.get( '/gym/home', gym.home )

    app.post( '/gym/homeAssign', gym.homeAssign )

}
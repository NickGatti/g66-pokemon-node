//Update the name of the controller below and rename the file.
const index = require( "../controllers/index.js" );
const pokemon = require( "../controllers/pokemon.js" );

module.exports = function ( app ) {

    app.get( '/', index.main );

    app.get( '/home', index.homePage )

    app.get( '/pokemon', pokemon.viewPokemon )

    app.post( '/pokemon/add', pokemon.addPokemon )

    app.get( '/pokemon/view/:id', pokemon.showPokemon )

    app.get( '/pokemon/edit/:id', pokemon.editPokemon )

    app.post( '/pokemon/update/:id', pokemon.updatePokemon )

    app.post( '/pokemon/delete/:id', pokemon.deletePokemon )

}
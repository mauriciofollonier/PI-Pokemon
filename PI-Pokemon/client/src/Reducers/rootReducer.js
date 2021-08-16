import { GET_POKEMONS } from '../Actions/constants.js'

// Estado Inicial

var initialState = {
    pokemons: [],
	pokemonDetail: [],
	pokemonList: {
		all: [],
		now: [],
	},
	pokemonsTypes: [],
	pokemonFilter: 'All',
	pokemonOrigin: 'All',
}

function rootReducer (state = initialState, action) {
    switch (type) {
		case GET_POKEMONS:
			return {
				...state,
				pokemons: action.payload,
				/* pokemonList: {
					all: payload,
					now: GetPokemonsList(payload),
				}, */
			}
            /* case ORDER_POKEMONS_ASC:
			return { // Al ordernar tenemso que devolver un nuevo arreglo.
				...state,
				pokemons: pokemons.sort(),
			} */
            default: return state;
   }
}


export default rootReducer;
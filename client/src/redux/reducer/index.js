const initialState = {
    pokemons: [],
    allpokemons: [],
    details: [],
    filterPokemon: [],
    allTypes: []


};

function rootReducer(state = initialState, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allpokemons: action.payload
            }
        case 'POST_POKEMON':
            return {
                ...state,
            }
        case 'GET_TYPES':
            return {
                ...state,
                allTypes: action.payload
            }
        case 'GET_NAME_POKEMONS':
            return {
                ...state,
                pokemons: action.payload

            }

        case 'CLEAR_DETAIL':
            return {
                ...state,
                detailPokemon: []
            }

        case 'FILTER_BY_FILTER':
            const allpokemons = state.allpokemons
            console.log(state)
            const pokemonsFiltered = action.payload === 'All' ? allpokemons :
                allpokemons.filter(el => el.types.includes(action.payload))
            console.log(pokemonsFiltered)
            return {
                ...state,
                pokemons: pokemonsFiltered

            }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === "asc" ?
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                // eslint-disable-next-line array-callback-return
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                pokemons: sortedArr
            }
        // Filtro creados, existentes 
        case 'FILTER_CREATED':
            const createdFilter = action.payload === 'created' ?
                state.allpokemons.filter(el => el.createdInDb) :
                state.allpokemons.filter(el => !el.createdInDb)
            console.log(createdFilter)
            return {
                ...state,
                pokemons: action.payload === 'all' ? state.allpokemons : createdFilter
            }
        case 'GET_DETAIL':
            return {
                ...state,
                details: action.payload
            }
        default:
            return state;

    }
}
export default rootReducer;
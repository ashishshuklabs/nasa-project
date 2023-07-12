import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pokemon } from '../../api/types'
import { AppThunk } from '../../store/store'
import { fetchPokemonRequest } from '../../api/requests/pokemon'


// State type will be inferred using the initialState 
// as defined by this interface
export interface PokemonFetchState {
    pokeLoading: boolean,
    pokemon: Pokemon
    error: string | null,
}

const initialState = {
    pokemon: {},
    pokeLoading: false,
    error: null
} as PokemonFetchState
// PayloadAction helps defining the payload type
// Action creators will be updated to accept values accordingly
const pokemonslice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        fetchpokemon: (state) => {
            state.pokeLoading = true
        },
        fetchpokemonSuccess: (state, action: PayloadAction<Pokemon>) => {
            console.log('changing state now in reducer.....')
            state.pokeLoading = false,
            state.pokemon = action.payload
        },
        fetchpokemonFailure: (state, action: PayloadAction<string>) => {
            state.pokeLoading = false;
            state.error = action.payload
        }
    }
})

export const { fetchpokemon, fetchpokemonSuccess, fetchpokemonFailure } = pokemonslice.actions

export default pokemonslice.reducer

// Thunk Function: Has to be a promise because we want it to be non-blocking.
export const fetchPokemonAsync = (idOrName: string): AppThunk => (dispatch, getState) => {
    dispatch(fetchpokemon())
    // must return promise to track status during ssr, else loading state is never
    // registered. If we don't, when the request is fired, loading is set to true but it is
    // never updated server side because nothing was returned here, so the initial
    // state will always contain loading = true as the starting point. Normally this 
    // should return void, when called client side.
    return fetchPokemonRequest(idOrName)
        .then(response => {
            if (response.type === 'success') {
                console.log('pokemon fetched, now loading state should be false')
                dispatch(fetchpokemonSuccess(response.data))
                // console.log('get state in success', getState().pokemon)
                return
            }
            dispatch(fetchpokemonFailure(response.data.message))
        })
        .catch(err =>
            dispatch(fetchpokemonFailure(err.data.message))
        )
}

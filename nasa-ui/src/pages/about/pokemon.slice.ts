import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Pokemon } from '../../api/types'
import { AppThunk } from '../../store/store'
import { fetchPokemonRequest } from '../../api/requests/pokemon'


// State type will be inferred using the initialState 
// as defined by this interface
export interface PokemonFetchState {
    loading: boolean,
    pokemon: Pokemon
    error: string | null,
}

const initialState = {
    pokemon: {
        id: 1,
        name: '1',
        base_experience: 1,
        height: 1,
        is_default: true,
        order: 1,
        weight: 1,
        location_area_encounters:'Strange places'
    },
    loading: false,
    error: null
} as PokemonFetchState
// PayloadAction helps defining the payload type
// Action creators will be updated to accept values accordingly
const pokemonslice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        fetchpokemon: (state) => {
            state.loading = true
        },
        fetchpokemonSuccess: (state, action: PayloadAction<Pokemon>) => {
            state.loading = false,
                state.pokemon = action.payload
        },
        fetchpokemonFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const { fetchpokemon, fetchpokemonSuccess, fetchpokemonFailure } = pokemonslice.actions

export default pokemonslice.reducer

// Thunk Function
export const fetchPokemonAsync = (idOrName: string): AppThunk => (dispatch, getState) => {
    dispatch(fetchpokemon())
    fetchPokemonRequest(idOrName)
        .then(response => {
            if (response.type === 'success') {
                dispatch(fetchpokemonSuccess(response.data))
                console.log('get state in success', getState().pokemon)
                return
            }
            dispatch(fetchpokemonFailure(response.data.message))
        })
        .catch(err =>
            dispatch(fetchpokemonFailure(err.data.message))
        )
}

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_URL, DataType } from '../../api/requests/planets'
import { AppThunk } from 'src/store/store'
import fetch from 'isomorphic-fetch'


// State type will be inferred using the initialState 
// as defined by this interface
export interface PlanetFetchState {
    loading: boolean,
    planets: DataType
    error: string | null,
}
// "kepid":"7907423","kepoi_name":"K00899.03","kepler_name":"Kepler-249
const initialState = {
    loading: false,
    planets: [{}],
    error: null,
} as PlanetFetchState
// PayloadAction helps defining the payload type
// Action creators will be updated to accept values accordingly
const planetSlice = createSlice({
    name: 'planets',
    initialState,
    reducers: {
        fetchPlanets: (state) => {
            state.loading = true
        },
        fetchPlanetsSuccess: (state, action: PayloadAction<DataType>) => {
            state.loading = false,
                state.planets = action.payload
        },
        fetchPlanetsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const { fetchPlanets, fetchPlanetsSuccess, fetchPlanetsFailure } = planetSlice.actions

export default planetSlice.reducer
createAsyncThunk(fetchPlanets.type,(a,b)=>{
    b.fulfillWithValue('passed')
})

// This will be used later, it's of no use during server render
export const getPlanets = (): AppThunk => async(dispatch, getState) => {
    dispatch(fetchPlanets())
    await fetch(API_URL, { method: 'GET' })
        .then(res => {
            return res.json()
        }) 
        .then((data: DataType) => {
            dispatch(fetchPlanetsSuccess(data))
        })
        .catch((e: Error) => {
            dispatch(fetchPlanetsFailure(e.message))
        })
}
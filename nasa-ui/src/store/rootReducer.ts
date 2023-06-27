import { combineReducers } from "@reduxjs/toolkit";
import planetsReducer from '../pages/home/planets.slice'
import pokemonReducer from '../pages/about/pokemon.slice'


const rootReducer = combineReducers({
    planets: planetsReducer,
    pokemon: pokemonReducer
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
import { combineReducers } from "@reduxjs/toolkit";
import planetsReducer from '../pages/home/planets.slice'


const rootReducer = combineReducers({
    planets: planetsReducer
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
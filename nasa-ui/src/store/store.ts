import { configureStore, Action, PreloadedState } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./rootReducer";

export function createStore (preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer, 
        preloadedState
    })
}
const store = createStore()

export type AppThunk = ThunkAction<void, RootState, unknown, Action>
export type AppDispatch = typeof store.dispatch;
export default store
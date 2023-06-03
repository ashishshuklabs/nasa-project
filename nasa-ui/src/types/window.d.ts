import { PlanetFetchState } from "../pages/home/planets.slice"
import { DataType } from "../api/requests/planets"

export {}

declare global {
    interface Window {
        INITIAL_STATE?:PlanetFetchState
    }
}
import { PlanetFetchState } from "../pages/home/planets.slice"
import { DataType } from "../api/requests/planets"
import { PokemonFetchState } from "../pages/about/pokemon.slice"

export { }

declare global {
    interface Window {
        INITIAL_STATE?: {
            planets: PlanetFetchState,
            pokemon: PokemonFetchState
        },
        ChunkData?: Record<string, any>[],
        globalCache?:Map<string, any>
    }
}
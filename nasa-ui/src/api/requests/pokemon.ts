import fetch from "isomorphic-fetch";
import { promiseWrapper } from "../wrapper/wrapper";
import { Pokemon, PokeResponse, returnSuccess, returnError } from "../types";
const Base = 'https://pokeapi.co/api/v2';
const Resource = 'pokemon'
const API_Endpoint = `${Base}/${Resource}`

// The new stuff returning an object with read function. Supposed to work with
// Suspense, didn't have much luck yet.
// ToDo: Fix Return types
const fetchPokemonWithWrapper = (idOrName: string): { read: () => any } => {
    const endpoint = API_Endpoint + `/${idOrName}`;
    console.log({ endpoint })
    const promise = fetch(endpoint).then(res => res.json()).then(res => res.data);

    return promiseWrapper(promise)
}

// Normal API returning fetched pokemon based on id
const fetchPokemonRequest = (idOrName: string): Promise<PokeResponse>=> {
    const endpoint = API_Endpoint + `/${idOrName}`;
    const promise = fetch(endpoint)
        .then(res => res.json())
        .then((data) => {
            console.log({data})
            return returnSuccess(data)})
        .catch((e: Error) => returnError(e));
    return promise
}

export { fetchPokemonRequest, fetchPokemonWithWrapper }
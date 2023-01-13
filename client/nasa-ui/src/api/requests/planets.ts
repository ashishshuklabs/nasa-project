const API_URL = 'http://localhost:8000';

type PlanetsType  = Record<string, any>[]

async function getPlanets<Planets>() {
    return await fetch(`${API_URL}/planets`)
}

export {
    getPlanets
};
export type { PlanetsType };

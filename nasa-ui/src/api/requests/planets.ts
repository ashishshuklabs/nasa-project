import fetch from 'isomorphic-fetch'

// const API_URL_OLD = 'http://localhost:8000';
// const API_URL = encodeURI('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=json&where=koi_disposition%20like%20%27CANDIDATE%27&where=koi_period%3E300,koi_prad%3C2&order=koi_period&format=ascii')
const API_URL = 'https://jsonplaceholder.typicode.com/comments'
type PlanetsType = Record<string, any>[]

type DataType = {
    postId: number,
    id: number,
    name: string,
    email: string,
    body:string
  }[]
function getData<T>() {
    return fetch(`${API_URL}`)
        .then(res => res.json() )
        .then(data => data as T )
        .catch(e => e instanceof Error ? e.message : 'Error fetching data')
}
export {
    getData,
    API_URL
};
export type { PlanetsType, DataType };

import fetch from 'isomorphic-fetch'

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

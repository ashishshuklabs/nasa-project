import express from 'express'
import { getAllPlanets } from './planets.controller';
// This is where we define all planet routes
const planetsRoute = express.Router()


planetsRoute.get('/', getAllPlanets)
// just a test for params
planetsRoute.get('/:id', (req, res) => {
    return  res.status(200).json('Hello this is planet ' + (100 + (+req.params.id)))
})

export default planetsRoute;
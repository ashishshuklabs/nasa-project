import express from 'express'
import { getAllPlanets } from './planets.controller';
// This is where we define all planet routes
const planetsRoute = express.Router()


planetsRoute.get('/planets', getAllPlanets)

export default planetsRoute;
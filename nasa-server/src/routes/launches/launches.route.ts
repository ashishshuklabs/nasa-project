import express from 'express'
import { httpAddLaunch, httpGetAllLaunches } from './launches.controller'

const launchesRoute = express.Router()

launchesRoute.get('/', httpGetAllLaunches)
launchesRoute.post('/add', httpAddLaunch)

export default launchesRoute
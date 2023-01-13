import express from 'express'
import planetsRoute from './routes/planets/planets.route';
import cors from 'cors'

const app = express();
// apply cors for all requests so goes first
app.use(cors())
//apply built-in json middleware
app.use(express.json())
// all individual routes go next as middlewares
app.use(planetsRoute)

export default app
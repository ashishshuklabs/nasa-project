import express from 'express'
import planetsRoute from './routes/planets/planets.route';
import cors from 'cors'
import launchesRoute from './routes/launches/launches.route';

const app = express();
// apply cors for all requests so goes first
app.use(cors({
    origin:'http://localhost:7456',
    
}))
//apply built-in json middleware
app.use(express.json())
// all individual routes go next as middlewares
app.use('/planets', planetsRoute)
app.use('/launches', launchesRoute)

export default app
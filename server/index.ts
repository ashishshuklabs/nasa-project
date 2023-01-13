import http from 'http'
import app from './src/app';
import { getPlanets } from './src/models/planets/planets.model';
const PORT = process.env.port || "8000";
const server = http.createServer(app)


async function startServer() {

    //loading data before server start.
    await getPlanets()
    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}...`)
    })
}

startServer();
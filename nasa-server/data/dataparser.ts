import { parse } from 'csv-parse'
import fs from 'fs'
import path from 'path'


const isHabitable = (data: { koi_prad: number }) => {
    return data.koi_prad > 1.1 && data.koi_prad < 1.145
}

const habitablePlanets: any[] = []
function getPlanets() {

    return new Promise((res, rej) => {
        fs.createReadStream(path.join(__dirname, 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true
            }))
            .on('data', (data) => {
                if (isHabitable(data)) {
                    habitablePlanets.push(data)
                }
                // console.log('planets', habitablePlanets)
            })
            .on('error', (err) => {
                console.log('an error occured reading stream', err)
                rej(err)
            })
            .on('end', () => {
                console.log('finished reading stream..')
                // console.log(habitablePlanets)
                res(undefined)
            })
    })
}

export {
    getPlanets,
    habitablePlanets
}
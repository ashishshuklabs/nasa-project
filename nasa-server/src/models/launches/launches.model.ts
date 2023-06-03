let flightNumber = 100;
const launch = {
    flightNumber: flightNumber,
    missionName: 'Kepler 124',
    clients: ['abc', 'USC'],
    upcoming: true,
    status: true,
    launchDate: 'December 23, 2023',
    destination: 'jupiter'
}

type Launch = typeof launch;
const launches = new Map()
launches.set(launch.flightNumber, launch)

function getAllLaunches():Launch[] {
    return Array.from(launches.values())
}

function addLaunch(newLaunch: Launch) {
    flightNumber++;
    launches.set(flightNumber, { ...newLaunch, flightNumber })
    return Array.from(launches)
}

export {
    getAllLaunches,
    addLaunch
}
let driversCache = null;   // now holds a promise, not an array

export function getDrivers() {
    if (driversCache) return driversCache;

    async function load() {
        let raw;

        try {
            let response = await fetch('https://api.openf1.org/v1/drivers?session_key=latest');
            if (!response.ok) throw new Error(`OpenF1 returned ${response.status}`);
            raw = await response.json();
        } catch (error) {
            console.warn("OpenF1 unavailable, using snapshot:", error);
            try {
                let response = await fetch('./data/drivers.json');
                if (!response.ok) throw new Error(`Snapshot returned ${response.status}`);
                raw = await response.json();
            } catch (snapshotError) {
                console.warn("Snapshot unavailable, rendering without photos:", snapshotError);
                raw = [];
            }
        }

        let driverArray = [];
        for (let driver of raw) {
            driverArray.push({
                name: driver.first_name + " " + driver.last_name,
                lastName: driver.last_name,
                driverNumber: driver.driver_number,
                teamName: driver.team_name,
                teamColor: driver.team_colour,
                driverImage: driver.headshot_url,
                acronym: driver.name_acronym
            });
        }


        if (driverArray.length === 0) driversCache = null;

        return driverArray;
    }


    driversCache = load();
    return driversCache;
}

export async function getStandings() {
    let response = await fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings/');
    let data = await response.json();
    let raw = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    return raw.map(entry => {
        return {
            name: entry.Driver.givenName + " " + entry.Driver.familyName,
            team: entry.Constructors[0].name,
            points: Number(entry.points),
            position: Number(entry.position),
            driverNumber: Number(entry.Driver.permanentNumber)
        };
    });

}

export async function getResults(){
    let data = await fetch("https://f1api.dev/api/2026");
    let raw = await data.json();
    return raw.races.map(race => ({
        raceName: race.raceName,
        round: race.round,
        date: race.schedule.race.date,
        circuit: race.circuit.circuitName,
        country: race.circuit.country,
        city: race.circuit.city,
        winner: race.winner,
        isPast: race.winner !== null
    }));
}

export async function getLastWinner(){
    let results = await getResults();
    let lastRace = results.findLast(race => race.isPast);
    return lastRace ? lastRace.winner : null;
}

export async function getFirstPlace(){
    let data = await getCombinedStandings();
    return data[0];
}

export async function getNextRace(){
    let races = await getResults();
    return races.find(race => !race.isPast);
}

export async function getLastRace(){
    let races = await getRacesWithWinners();
    return races.findLast(race => race.isPast);
}

export async function getCombinedStandings() {
    let [standings, drivers] = await Promise.all([
        getStandings(),
        getDrivers()
    ]);

    return standings.map(standing => {
        let matchingDriver = drivers.find(driver =>
            driver.driverNumber === standing.driverNumber);

        return {
            ...standing,
            image: matchingDriver ? matchingDriver.driverImage : './images/placeholderImage.png',
            teamColor: matchingDriver ? matchingDriver.teamColor : "5b5b5b"
        };

    });
}


export function getOrdinals(number) {
    let lastTwo = number % 100;
    let lastOne = number % 10;

    if (lastTwo === 11 || lastTwo === 12 || lastTwo === 13) {
        return "th";
    }

    if (lastOne === 1) return "st";
    if (lastOne === 2) return "nd";
    if (lastOne === 3) return "rd";
    return "th";
}

export async function getRacesWithWinners(){
    let [races, drivers] = await Promise.all([getResults(), getDrivers()]);

    return races.map(race => {
        if (!race.winner) return race;

        let match = drivers.find(d => d.acronym === race.winner.shortName);

        return {
            ...race,
            winner: {
                ...race.winner,
                image:     match ? match.driverImage : null,
                teamColor: match ? match.teamColor   : null,
                name: match ? match.name : null,
                team: match ? match.teamName : null
            }
        };
    });
}








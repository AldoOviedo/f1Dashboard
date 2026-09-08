
export async function getDrivers() {

    let data = await fetch('https://api.openf1.org/v1/drivers?session_key=latest');
    let drivers = await data.json();


    let driverArray = [];

    for (let driver of drivers){
        driverArray.push({
            firstName: driver.first_name,
            lastName: driver.last_name,
            driverNumber: driver.driver_number,
            teamName: driver.team_name,
            teamColor: driver.team_colour,
            driverImage: driver.headshot_url

        });

    }
    return driverArray;
}



export async function  getRawData() {
    let response = await fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings/');
    let data = await response.json();
    let raw = data.MRData;
    console.log(raw);
}

export async function getStandings() {
    let response = await fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings/');
    let data = await response.json();
    let raw = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    console.log(raw);
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

export async function getSeasonCalender(){
    let response = await fetch('https://api.jolpi.ca');
    let data = await response.json();
    console.log(data.valueOf());
    return data
}

let season = await getSeasonCalender();
console.log("season renders" + season);
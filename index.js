

class Driver {
    constructor(firstName, lastName, team, number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.team = team;
        this.number = number;
    }
}

let lewis = new Driver('Lewis', 'Hamilton',"Mercedes", 43);

console.log(lewis.team);

async function  getDrivers() {
    let response = await fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings/');
    let data = response.json();
    return await data;

}

async function loadDrivers() {
    let results = await getDrivers();
    console.log(results);
}

loadDrivers();



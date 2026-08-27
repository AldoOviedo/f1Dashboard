import {getDrivers} from "./JS/API";
import {renderDrivers} from "./JS/driverRenders";

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
    let data = await response.json();
    let raw = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    console.log(raw);
    return raw.map(entry => ({
        name: entry.Driver.givenName + " " + entry.Driver.familyName,
        team: entry.Constructors[0].name,
        points: Number(entry.points),
        position: Number(entry.position)
    }));

}

let gridMain = document.getElementById("race-grid");

async function loadDrivers() {
   let drivers = await getDrivers();

   for (let driver of drivers) {

       let gridBox = document.createElement("div");
       let boxName = document.createElement("div");
       let boxTeam = document.createElement("div");
       boxName.innerText = driver.name;
       boxTeam.innerText = driver.team;
       gridBox.appendChild(boxName);
       gridBox.appendChild(boxTeam);
       gridBox.className = "race-grid-content";
       boxName.className = "driver-header-name";
       boxTeam.className = "driver-team-name";
       gridMain.appendChild(gridBox);
   }
}

loadDrivers();







async function  getDrivers() {
    let response = await fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings/');
   let data = response.json();
   return await data;

}

async function loadDrivers() {
    let results = await getDrivers();
    console.log(results);
}

console.log('hello');

console.log(loadDrivers());


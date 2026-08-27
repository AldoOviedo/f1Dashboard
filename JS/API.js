
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

let drivers =  await getDrivers();

console.log(drivers);


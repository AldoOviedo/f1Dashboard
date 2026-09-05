import {driverRender} from "./driverRenders.js";
import {getDrivers} from "./API.js";


export async function renderDrivers(){
    let drivers = await getDrivers();
    let container = document.createElement("div");
    container.className = "driver-race-grid-main"
    let driverData = await driverRender(drivers);
    container.appendChild(driverData);
    return container;
}

let button = document.getElementById("driverButton");


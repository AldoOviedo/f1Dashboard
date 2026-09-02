import {driverRender, renderDrivers} from "./JS/driverRenders.js";
import {getDrivers} from "./JS/API.js";
import {createElements} from "./JS/elements.js";

async function render(){
    let drivers = await getDrivers();
    let container = document.getElementById("driverLoader");
    let driverData = await driverRender(drivers);
    container.appendChild(driverData);
}

let button = document.getElementById("driverButton");

render();

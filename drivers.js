import {renderDrivers} from "./JS/driverRenders.js";
import {getDrivers} from "./JS/API.js";

async function render(){
    let drivers = await getDrivers();
    let container = document.getElementById("driverLoader");
    let driverData = await renderDrivers(drivers);
    container.appendChild(driverData);
}

let button = document.getElementById("driverButton");

button.addEventListener("click", render);
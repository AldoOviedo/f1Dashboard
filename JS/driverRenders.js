import {createContainer, createDriverCard, createElements} from "./elements.js";
import {getDrivers} from "./API.js";


export function driverRender(drivers) {

    let container = createContainer("div", "driver-card-grid");

    for (let driver of drivers) {

       let driverCard = createDriverCard(driver);
       container.append(driverCard);
    }

    return container;

}



export async function showDrivers(){
    let drivers = await getDrivers();
    return driverRender(drivers);
}


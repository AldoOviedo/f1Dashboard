import {createContainer, createElements} from "./elements.js";
import {getDrivers} from "./API.js";


export function driverRender(drivers) {

    let container = document.createElement("section");

    for (let driver of drivers) {

        let driverCard = createContainer("div", "driver-card");
        let driverImage = createContainer("div", "driver-image");
        let driverNameDiv = createElements("div", "driver-name", driver.firstName + " " + driver.lastName);
        let driverNumber= createElements("div", "driver-number", driver.driverNumber);
        let driverTeamDiv = createElements("div", "driver-team", driver.teamName);
        let driverTeamNameContainer = createContainer("div", "team-name-container");
        driverImage.className = "driver-header-image";
        driverImage.style.backgroundImage = `url('${driver.driverImage}')`;
        driverCard.style.background = `radial-gradient(circle at top left, rgba(0, 0, 0, 0.75), #${driver.teamColor}99)`;
        driverTeamDiv.style.backgroundColor = "#" + driver.teamColor;
        driverTeamNameContainer.appendChild(driverNameDiv);
        driverTeamNameContainer.appendChild(driverTeamDiv);
        driverCard.appendChild(driverTeamNameContainer);
        driverCard.appendChild(driverNumber);
        driverCard.appendChild(driverImage);
        container.className = "driver-card-main";
        container.appendChild(driverCard);

    }

    return container;

}

export async function showDrivers(){
    let drivers = await getDrivers();
    console.log("drivers", drivers);
    return driverRender(drivers);
}


import {createContainer, createElements} from "./elements.js";
import {getDrivers} from "./API.js";


export async function driverRender() {

    let drivers = await getDrivers();
    let container = document.createElement("section");

    for (let driver of drivers) {

        let driverCard = createContainer("div", "driver-card");
        let driverImage = createContainer("div", "driver-image");
        let driverNameDiv = createElements("div", "driver-name", driver.firstName + " " + driver.lastName);
        let driverTeamDiv = createElements("div", "driver-team", driver.teamName);
        driverImage.className = "driver-header-image";
        driverImage.style.backgroundImage = `url('${driver.driverImage}')`;
        driverCard.style.background = `radial-gradient(circle at top left, rgba(0, 0, 0, 0.75), #${driver.teamColor}99)`;
        driverTeamDiv.style.backgroundColor = "#" + driver.teamColor;
        driverCard.appendChild(driverNameDiv);
        driverCard.appendChild(driverImage);
        driverCard.appendChild(driverTeamDiv);
        container.className = "driver-card-main";
        container.appendChild(driverCard);

    }

    return container;

}
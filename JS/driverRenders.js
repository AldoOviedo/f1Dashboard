import {createContainer, createElements} from "./elements.js";

export async function renderDrivers(drivers) {
    let container = document.createElement("section");

    console.log(drivers[0]);

    for (let driver of drivers){
        console.log(driver);
        let driverCard = document.createElement("div");
        let driverNameDiv = document.createElement("div");
        let driverTeamDiv = document.createElement("div");

        driverNameDiv.innerText = driver.firstName + " " + driver.lastName;
        driverTeamDiv.innerText = driver.teamName;
        driverCard.appendChild(driverNameDiv);
        driverCard.appendChild(driverTeamDiv);
        driverCard.className = "driver-card";
        driverCard.style.backgroundColor = "#" + driver.teamColor;
        container.className = "driver-card-main";
        container.appendChild(driverCard);
    }
    return container;
}

export function driverRender(drivers) {
    let container = document.createElement("section");

    for (let driver of drivers) {

        let driverCard = createContainer("div", "driver-card");
        let driverNameDiv = createElements("div", "driver-name", driver.firstName);
        let driverTeamDiv = createElements("div", "driver-team", driver.teamName);
        driverTeamDiv.style.backgroundColor = "#" + driver.teamColor;
        driverCard.appendChild(driverNameDiv);
        driverCard.appendChild(driverTeamDiv);
        container.className = "driver-card-main";
        container.appendChild(driverCard);

    }

    return container;

}


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
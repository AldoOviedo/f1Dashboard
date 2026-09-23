export function createElements(type,className,data){
    let element = document.createElement(type);
    element.className = className;
    element.innerText = data;

    return element;
}



export function loadElements(){
    let createdDiv  = createElements("div", "divTest", "hellppppo");

    let dataDiv = createElements("div", "dataDiv", "data will go here");

    let container = document.getElementById("tester");
    container.appendChild(createdDiv);
    container.appendChild(dataDiv);
}

export function createContainer(type, className){
    let container = document.createElement(type);
    container.className = className;
    return container;
}

export function createDriverCard(driver){

    let driverCard = createContainer("div", "driver-card");

    let driverName = createElements("div", "auto-driver-name", driver.name);
    let driverNumber = createElements("div", "auto-driver-number", driver.driverNumber);

    driverCard.append(driverName, driverNumber);

    if (driver.points > 0){
        let driverPoints = createElements("div", "driver-points", driver.points);
        driverCard.appendChild(driverPoints);
    }

    if (driver.image){
        let driverImage = createContainer("div", "driver-image");
        driverImage.style.backgroundImage = `url('${driver.image}')`;
        driverCard.appendChild(driverImage);
    }
    return driverCard;
}

export function createRaceCard(race){
    let raceCard = createContainer("div", "race-card-container");
    let raceCardHeader = createContainer("div", "race-card-header");
    let raceInfoContainer = createContainer("div", "race-info-container");

    let raceCity = createElements("div", "race-card-name", race.city);
    let racetrack = createElements("div", "race-track-name", race.circuit);
    let raceDate = createElements("div", "race-date", race.date);

    let raceRound = createElements("div", "race-round", race.round);

    raceInfoContainer.append(raceCity, racetrack, raceDate);
    raceCardHeader.append(raceInfoContainer, raceRound);

    raceCard.append(raceCardHeader);

    if (!race.winner){
        let upcoming = createElements("div", "upcoming-text", "• Upcoming");
        raceCard.append(upcoming);
        raceCard.style.background = `radial-gradient(circle at top left, rgba(0, 0, 0, 0.75), #5b5b8399)`;
        return raceCard
    } else {
        let raceWinnerContainer = createContainer("div", "race-winner-container");

        let raceWinnerImage = createContainer("div", "winner-image");
        raceWinnerImage.style.backgroundImage = `url('${race.winner.image}')`;

        raceWinnerContainer.append(raceWinnerImage);

        let winnerInfoContainer = createContainer("div", "winner-info-container");

        let winnerName = createElements("div", "winner-name", race.winner.name);

        let winnerTeamInfo = createElements("div", "winner-team-info", race.winner.team);
        winnerTeamInfo.style.backgroundColor = "#" + race.winner.teamColor;

        winnerInfoContainer.append(winnerName,winnerTeamInfo);
        raceWinnerContainer.append(winnerInfoContainer);

        raceCard.style.background = `radial-gradient(circle at top left, rgba(0, 0, 0, 0.75), #${race.winner.teamColor}99)`;

        raceCard.append(raceWinnerContainer);

        return raceCard;
    }

}


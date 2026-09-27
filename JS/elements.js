export function createElements(type,className,data){
    let element = document.createElement(type);
    element.className = className;
    element.innerText = data;

    return element;
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

export function createLeaderCard(driver){
    let leaderCard = createContainer("div", "leader-card");

    if (driver.image){
        let driverImage = createContainer("div", "driver-image");

        driverImage.style.backgroundImage = `url('${driver.image}')`;
        leaderCard.append(driverImage);
    }

    let leaderInfoContainer = createContainer("div","leader-info-container");

    let leaderCardTitle = createElements("div", "leader-card-text", "Championship Leader");
    let leaderName = createElements("div", "leader-card-name", driver.name);
    let leaderTeam = createElements("div", "leader-team", driver.team);

        leaderTeam.style.backgroundColor = "#" + driver.teamColor;

    let driverPoints = createElements("div", "leader-card-points", driver.points);
    let driverPointsText = createElements("div", "leader-card-points-text", "Points • P1");

    leaderInfoContainer.append(leaderCardTitle, leaderName, leaderTeam, driverPoints, driverPointsText);
    leaderCard.append(leaderInfoContainer);
    leaderCard.style.background = `radial-gradient(circle at top left, rgba(0, 0, 0, 0.75), #${driver.teamColor}99)`;

    return leaderCard;


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

export function createLastRaceCard(race){

    let lastRaceCard = createContainer("div", "last-race-card");

    lastRaceCard.append(createElements("div", "last-race-title-main", "LAST RACE"));

    let raceInfoContainer = createContainer("div", "last-race-info");

    let lastRaceCity = createElements("div", "last-race-city", race.city);
    let lastRaceTrackPlusRound = createElements("div", "last-race-track", `${race.circuit}`);

    raceInfoContainer.append(lastRaceCity,lastRaceTrackPlusRound);

    let driverContainer = createContainer("div", "last-race-driver");
    let lastRaceWInnerImage = createContainer("div", "last-race-driver-image");
    lastRaceWInnerImage.style.backgroundImage = `url('${race.winner.image}')`;
    driverContainer.append(lastRaceWInnerImage);

    let driverInfoContainer = createContainer("div", "last-race-winner-driver-info");

    let lastRaceDriverName = createElements("div", "last-race-driver-name", race.winner.name);
    let lastRaceDriverTeam = createElements("div", "last-race-driver-team", race.winner.team);
    lastRaceDriverTeam.style.backgroundColor = "#" + race.winner.teamColor;
    driverInfoContainer.append(lastRaceDriverName,lastRaceDriverTeam);
    driverContainer.appendChild(driverInfoContainer);

    lastRaceCard.append(raceInfoContainer,driverContainer);
    lastRaceCard.style.background = `radial-gradient(circle at top left, rgba(0, 0, 0, 0.75), #${race.winner.teamColor}99)`;

    return lastRaceCard;
}

export function createNextRace(race) {

    let nextRaceCard = createContainer("div", "next-race-card");
    nextRaceCard.append(createElements("div", "next-race-title-main", "NEXT RACE"));

    let nextRaceInfoContainer = createContainer("div", "next-race-info-container");

    let nextRaceCity = createElements("div", "next-race-city", race.city);
    let nextRaceTrackPlusRound = createElements("div", "next-race-track", `${race.circuit} • Round ${race.round}`);

    nextRaceInfoContainer.append(nextRaceCity,nextRaceTrackPlusRound);

    let raceDate = createElements("div", "next-race-date", race.date);

    nextRaceCard.style.background =  `radial-gradient(circle at top left, rgba(0, 0, 0, 0.75), #3b4b71)`;

    nextRaceCard.append(nextRaceInfoContainer, raceDate);

    return nextRaceCard;


}

export function dataErrorDiv(error){
    let errorContainer = createContainer("div", "error-container");

    errorContainer.append(createElements("div", "data-error", `Sorry :( Failed to get data: error - ${error}`));
    return errorContainer;
}

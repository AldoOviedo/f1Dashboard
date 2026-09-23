import {createContainer, createDriverCard, createElements} from "./elements.js";
import {getFirstPlace, getLastRace, getLastWinner, getNextRace, getResults} from "./API.js";
import {navigateTo} from "./router.js";



export async function renderHome(driver, nextRace, lastRace){

    let container = createContainer("div", "home-container");
    let firstPlaceCard = createContainer("button", "first-place-card");
    let nextRaceContainer = createContainer("button", "next-race-container");
    let lastRaceContainer = createContainer("button", 'last-winner-container');

    let homeTitle = createElements("h1", "home-title", "Formula 1 lite");
    let lastRaceTitle = createElements("div", "last-winner-title", `Last Race: ${lastRace.raceName}`);
    let lastRaceWinner = createElements("div","last-race-winner", `Winner: ${lastRace.winner.name}`);

    let currentLeaderText = createElements("div", "current-winner-text", "Leader:")
    let nextRaceName = createElements("div", "next-race-name", `Next Race: ${nextRace.raceName}`);

    firstPlaceCard.addEventListener("click", () => navigateTo("drivers"));
    nextRaceContainer.addEventListener("click", () => navigateTo("races"));

    firstPlaceCard.appendChild(currentLeaderText);
    firstPlaceCard.appendChild(createDriverCard(driver));

    nextRaceContainer.appendChild(nextRaceName);
    lastRaceContainer.append(lastRaceTitle, lastRaceWinner);


    container.appendChild(homeTitle);
    container.appendChild(firstPlaceCard);
    container.appendChild(lastRaceContainer);
    container.appendChild(nextRaceContainer);

    return container;

}

export async function showFirstPlaceCard(){
    let driver = await getFirstPlace();
    let nextRace = await getNextRace();
    let lastRace = await getLastRace();
    return renderHome(driver, nextRace, lastRace);
}

let lastRace = await getLastRace();

console.log(lastRace);



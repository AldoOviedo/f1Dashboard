import {
    createContainer,
    createElements,
    createLastRaceCard,
    createLeaderCard, createNextRace,
    createRaceCard
} from "./elements.js";
import {getFirstPlace, getRacesWithWinners} from "./API.js";
import {navigateTo} from "./router.js";



export async function renderHome(driver, nextRace, lastRace){

    let container = createContainer("div", "home-container");
    let homeTitle = createElements("h1", "home-title", "Formula 1 lite");
    container.appendChild(homeTitle);
    let leaderCard = createLeaderCard(driver);
    let lastRaceCard = createLastRaceCard(lastRace);
    let nextRaceCard = createNextRace(nextRace);
    let racesContainer = createContainer("div", "races-container");
    racesContainer.append(lastRaceCard, nextRaceCard);
    container.append(leaderCard, racesContainer);
    return container;

}

export async function showFirstPlaceCard(){
    let [driver, races] = await Promise.all([
        getFirstPlace(), getRacesWithWinners()
    ]);
    let nextRace = races.find(race => !race.isPast);
    let lastRace = races.findLast(race => race.isPast);
    return renderHome(driver, nextRace, lastRace);
}




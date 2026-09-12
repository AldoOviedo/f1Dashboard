import {createContainer, createElements} from "./elements.js";
import {getFirstPlace,getResults} from "./API.js";

export function renderHome(navigateTo){
    let container = createContainer("div", "home-container");
    let homeTitle = createElements("h1", "home-title", "Home Page");
    let standingsCard = createElements("div", "home-card", "View Standings");
    standingsCard.addEventListener("click", () => navigateTo("standings"));
    container.appendChild(homeTitle);
    container.appendChild(standingsCard);
    return container;
}

let winner = await getFirstPlace();

let pastRaces = await getResults();

console.log(winner);
console.log(pastRaces);
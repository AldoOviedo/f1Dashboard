import {createContainer, createElements} from "./elements.js";

export function renderHome(navigateTo){
    let container = createContainer("div", "home-container");
    let homeTitle = createElements("h1", "home-title", "Home Page");
    let standingsCard = createElements("div", "home-card", "View Standings");
    standingsCard.addEventListener("click", () => navigateTo("standings"));
    container.appendChild(homeTitle);
    container.appendChild(standingsCard);
    return container;
}
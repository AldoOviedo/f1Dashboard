import {createContainer, createElements} from "./elements.js";

export function renderRaces(){
    let container = createContainer("div", "race-container");
    let raceTitle = createElements("h1", "races-title", "races loads");
    container.appendChild(raceTitle);
    return container;
}
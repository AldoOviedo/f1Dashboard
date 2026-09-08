import {createContainer, createElements} from "./elements.js";
import {getSeasonCalender} from "./API";

export function renderRaces(){
    let container = createContainer("div", "race-container");
    let raceTitle = createElements("h1", "races-title", "races loads");
    container.appendChild(raceTitle);
    return container;
}

export async function getFilteredRaceData(){
    let races = await getSeasonCalender();
    return {
        round: races.round,
        circuit: races.Circuit.circuitId,
        season: races.season,
    }
}
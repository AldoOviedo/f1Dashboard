import {createContainer, createElements} from "./elements.js";
import {getResults} from "./API.js";

export function renderRaces(races){
    let container = createContainer("div", "race-container");
   for (let race of races){
       let raceCard = createContainer("div", "race-card");
       let raceDiv = createElements("div", "race-title", race.raceName);
       let firstDivider = createContainer("div", "first-divider");
       let circuitDiv = createElements("div", "ciruit-div", race.circuit);
       let secondDivider = createContainer("div", "second-divider");

       raceCard.appendChild(raceDiv);
       raceCard.appendChild(firstDivider);
       raceCard.appendChild(circuitDiv);

       if (race.isPast){
           raceCard.appendChild(secondDivider);
           let winner = createElements("div", "race-winner", race.winner.driverId);
           raceCard.appendChild(winner);
       }
       container.appendChild(raceCard);
   }
    return container;
}

export async function showRaces(){
    let races = await getResults();
    return renderRaces(races);
}




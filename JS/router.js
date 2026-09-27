import {showFirstPlaceCard} from "./home.js";
import {showDrivers} from "./driverRenders.js";
import {showStandings} from "./standings.js";
import {showRaces} from "./races.js";
import {createContainer, dataErrorDiv} from "./elements.js";


let currentPage = "home";


export async function router(){
    let outlet = document.getElementById("outlet");
    outlet.innerHTML = "";
    outlet.appendChild(createContainer("div", "spinner"));

    try {
        if (currentPage === "home") {
            let page = await showFirstPlaceCard();
            outlet.innerHTML = "";
            outlet.appendChild(page);

        } else if (currentPage === "drivers") {
            let drivers = await showDrivers();
            outlet.innerHTML = "";
            outlet.appendChild(drivers);
        } else if (currentPage === "standings") {
            let standings = await showStandings();
            outlet.innerHTML = "";
            outlet.appendChild(standings);
        } else if (currentPage === "races") {
            let races = await showRaces();
            outlet.innerHTML = "";
            outlet.appendChild(races);
        }

    } catch (error){
        outlet.innerHTML = "";
        outlet.appendChild(dataErrorDiv(error));
    }
}

export function navigateTo(page) {
    currentPage = page;
    router();
}
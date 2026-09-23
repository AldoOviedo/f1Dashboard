import {showFirstPlaceCard} from "./home.js";
import {showDrivers} from "./driverRenders.js";
import {loadStandingInfo, showStandings} from "./standings.js";
import {showRaces} from "./races.js";


let currentPage = "home";


export async function router(){
    let outlet = document.getElementById("outlet");
    outlet.innerHTML = "";
    if (currentPage === "home") {
        outlet.appendChild(await showFirstPlaceCard());
        console.log("home link clicked" + currentPage);
    } else if (currentPage === "drivers") {
        outlet.appendChild(await showDrivers());
    } else if (currentPage === "standings") {
        outlet.appendChild(await showStandings());
    } else if (currentPage === "races") {
        outlet.appendChild(await showRaces());
    }

}

export function navigateTo(page) {
    currentPage = page;
    router();
}
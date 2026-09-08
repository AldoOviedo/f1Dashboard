import {loadStandingInfo} from "./JS/standings.js";
import {driverRender} from "./JS/driverRenders.js";
import {renderHome} from "./JS/home.js";
import {renderRaces} from "./JS/races.js";


let navContainer = document.getElementById("nav-container");
let currentPage = "home";

function navigateTo(page) {
    currentPage = page;
    router();
}

router();

navContainer.addEventListener("click", function (event){
    let page = event.target.dataset.page;
    if (page){
        event.preventDefault();
      navigateTo(page);
    }
})

async function router(){
    let outlet = document.getElementById("outlet");
    outlet.innerHTML = "";
    if (currentPage === "home") {
        outlet.appendChild(renderHome(navigateTo));
        console.log("home link clicked" + currentPage);
    } else if (currentPage === "drivers") {
        outlet.appendChild(await driverRender());
    } else if (currentPage === "standings") {
        outlet.appendChild(await loadStandingInfo());
    } else if (currentPage === "races") {
        outlet.appendChild(renderRaces());
    }

}











import {navigateTo, router} from "./JS/router.js";


let navContainer = document.getElementById("nav-container");

navContainer.addEventListener("click", function (event){
    let page = event.target.dataset.page;
    if (page){
        event.preventDefault();
        navigateTo(page);
    }
});

router();










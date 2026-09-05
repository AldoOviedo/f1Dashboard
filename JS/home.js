import {createContainer, createElements} from "./elements.js";

export function renderHome(){
    let container = createContainer("div", "home-container");
    let homeTitle = createElements("h1", "home-title", "Home Page");
    container.appendChild(homeTitle);
    return container;
}
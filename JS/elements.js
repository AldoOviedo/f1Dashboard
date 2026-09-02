export function createElements(type,className,data){
    let element = document.createElement(type);
    element.className = className;
    element.innerText = data;

    return element;
}



export function loadElements(){
    let createdDiv  = createElements("div", "divTest", "hellppppo");

    let dataDiv = createElements("div", "dataDiv", "data will go here");

    let container = document.getElementById("tester");
    container.appendChild(createdDiv);
    container.appendChild(dataDiv);
}

export function createContainer(type, className){
    let container = document.createElement(type);
    container.className = className;
    return container;
}


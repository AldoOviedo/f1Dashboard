import {getDrivers, getStandings} from "./JS/API.js";


async function getCombinedStandings() {
    let [standings, drivers] = await Promise.all([
        getStandings(),
        getDrivers()
    ]);

    console.log("standing number:", standings);
    console.log("driver numbers:", drivers.map(d => d.driverNumber));

    return standings.map(standing => {
        let matchingDriver = drivers.find(driver =>
        driver.driverNumber === standing.driverNumber);

        return {
            ...standing,
            image: matchingDriver ? matchingDriver.driverImage : null,
            teamColor: matchingDriver ? matchingDriver.teamColor : null
        };

    });
}

function getOrdinals(number) {
    let lastTwo = number % 100;
    let lastOne = number % 10;

    if (lastTwo === 11 || lastTwo === 12 || lastTwo === 13) {
        return number + "th";
    }

    if (lastOne === 1) return number + "st";
    if (lastOne === 2) return number + "nd";
    if (lastOne === 3) return number + "rd";
    return number + "th";


}


let gridMain = document.getElementById("race-grid");


async function renderDriverInfo(){
    let drivers = await getCombinedStandings();

    for (let driver of drivers) {

        let contentBox = document.getElementById("race-grid-content");
        let driverHeader = document.createElement("div");
        let driverHeaderImage = document.createElement("div");
        let driverHeaderNameDiv = document.createElement("div");
        let driverHeaderName = document.createElement("div");

        contentBox.className = "race-grid-content";
        driverHeader.className = "driver-header";
        driverHeaderImage.className = "driver-header-image";
        driverHeaderName.className = "driver-header-name";
        driverHeaderNameDiv.className = "driver-header-name-div";

        driverHeaderImage.style.backgroundImage = driver.driverImage;
        driverHeaderName.innerText = driver.firstName + ' ' + driver.lastName;


        contentBox.appendChild(driverHeaderImage);
        contentBox.appendChild(driverHeaderName);
        gridMain.appendChild(contentBox);

    }
}

async function loadStandingInfo(){

     let standings = await getCombinedStandings();


     for (let standing of standings) {

         let contentBox = document.createElement("div");
         contentBox.id = "race-grid-content";
         contentBox.className = "race-grid-content";
         contentBox.style.background = `radial-gradient(circle at top left, rgba(0, 0, 0, 0.75), #${standing.teamColor}99)`;

         let driverHeader = document.createElement("div");
         let driverHeaderImage = document.createElement("div");
         let driverHeaderNameDiv = document.createElement("div");
         let driverHeaderName = document.createElement("div");


         driverHeaderNameDiv.className = "driver-header-name-div";
         driverHeader.className = "driver-header";
         driverHeaderImage.className = "driver-header-image";
         driverHeaderName.className = "driver-header-name";

         driverHeaderImage.style.backgroundImage = `url('${standing.image}')`;
         driverHeaderName.innerText = standing.name;
         driverHeader.appendChild(driverHeaderImage);


         let driverTeamName = document.createElement("div");
         let driverTeamMain = document.createElement("div");

         driverTeamMain.className = "driver-team-main";
         driverTeamName.className = "driver-team-name";


         driverTeamName.innerText = standing.team;
         driverTeamName.style.backgroundColor = "#" + standing.teamColor
         driverTeamMain.appendChild(driverTeamName);
         driverHeaderNameDiv.appendChild(driverHeaderName);
         driverHeaderNameDiv.appendChild(driverTeamMain);


         let statsBox = document.createElement("div");
         let positionBox = document.createElement("div");
         let positionText = document.createElement("div");
         let positionDivider = document.createElement("div");
         let driverPosition = document.createElement("div");
         let statBoxDivider = document.createElement("div");
         let driverPointsBox = document.createElement("div");
         let driverPointsBoxText = document.createElement("div");
         let driverPointsBoxDivider = document.createElement("div");
         let driverPoints = document.createElement("div");


         statsBox.className = "stats-box";

         positionBox.className = "stats-position-box";
         positionText.className = "stats-position-box-text";
         positionDivider.className = "stats-position-box-divider";
         driverPosition.className = "stats-driver-position";

         statBoxDivider.className = "stats-box-divider";

         driverPointsBox.className = "stats-driver-position-box";
         driverPointsBoxText.className = "stats-driver-position-box-text";
         driverPointsBoxDivider.className = "stats-driver-position-box-divider";
         driverPoints.className = "stats-driver-points";

         positionText.innerText = "Position";
         driverPointsBoxText.innerText = "Points";
         driverPoints.innerText = standing.points;
         driverPosition.innerText = getOrdinals(standing.position);
         positionBox.appendChild(positionText);
         positionBox.appendChild(positionDivider);
         positionBox.appendChild(driverPosition);

         statsBox.appendChild(positionBox);
         statsBox.appendChild(statBoxDivider);

         driverPointsBox.appendChild(driverPointsBoxText);
         driverPointsBox.appendChild(driverPointsBoxDivider);
         driverPointsBox.appendChild(driverPoints);

         statsBox.appendChild(driverPointsBox);

         driverHeader.appendChild(driverHeaderNameDiv);


         contentBox.appendChild(driverHeader);
         contentBox.appendChild(statsBox);


         gridMain.appendChild(contentBox);
     }

}

loadStandingInfo();

getStandings();

let combined = await getCombinedStandings();
console.log("combined array");
console.log(combined);

console.log(getOrdinals(1));







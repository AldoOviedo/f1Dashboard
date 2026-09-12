import {getDrivers, getStandings} from "./API.js";

export async function loadStandingInfo(){

    let standings = await getCombinedStandings();

    let gridContainer = document.createElement("div");
    gridContainer.className = "standing-grid-main";


    for (let standing of standings) {



        let contentBox = document.createElement("div");
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
        driverTeamMain.style.backgroundColor = "#" + standing.teamColor
        driverTeamMain.appendChild(driverTeamName);
        driverHeaderNameDiv.appendChild(driverHeaderName);
        driverHeaderNameDiv.appendChild(driverTeamMain);


        let statsBox = document.createElement("div");
        let positionBox = document.createElement("div");
        let positionText = document.createElement("div");
        let positionDivider = document.createElement("div");
        let driverPositionSmallBox = document.createElement("div");
        let driverPosition = document.createElement("div");
        let driverPositionOrdinal = document.createElement("div");
        let statBoxDivider = document.createElement("div");
        let driverPointsBox = document.createElement("div");
        let driverPointsBoxText = document.createElement("div");
        let driverPointsBoxDivider = document.createElement("div");
        let driverPoints = document.createElement("div");


        statsBox.className = "stats-box";

        positionBox.className = "stats-position-box";
        positionText.className = "stats-position-box-text";
        positionDivider.className = "stats-position-box-divider";
        driverPositionSmallBox.className = "driver-position-small-box";
        driverPosition.className = "stats-driver-position";
        driverPositionOrdinal.className = "driver-position-ordinal";

        statBoxDivider.className = "stats-box-divider";

        driverPointsBox.className = "stats-driver-points-box";
        driverPointsBoxText.className = "stats-driver-points-box-text";
        driverPointsBoxDivider.className = "stats-driver-points-box-divider";
        driverPoints.className = "stats-driver-points";

        positionText.innerText = "Position";
        driverPointsBoxText.innerText = "Points";
        driverPoints.innerText = standing.points;
        driverPosition.innerText = standing.position;
        driverPositionOrdinal.innerText = getOrdinals(standing.position);
        positionBox.appendChild(positionText);
        positionBox.appendChild(positionDivider);
        driverPositionSmallBox.appendChild(driverPosition);
        driverPositionSmallBox.appendChild(driverPositionOrdinal);
        positionBox.appendChild(driverPositionSmallBox);

        statsBox.appendChild(positionBox);
        statsBox.appendChild(statBoxDivider);

        driverPointsBox.appendChild(driverPointsBoxText);
        driverPointsBox.appendChild(driverPointsBoxDivider);
        driverPointsBox.appendChild(driverPoints);

        statsBox.appendChild(driverPointsBox);

        driverHeader.appendChild(driverHeaderNameDiv);


        contentBox.appendChild(driverHeader);
        contentBox.appendChild(statsBox);

        gridContainer.appendChild(contentBox);

    }
    return gridContainer;
}

async function getCombinedStandings() {
    let [standings, drivers] = await Promise.all([
        getStandings(),
        getDrivers()
    ]);

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
        return "th";
    }

    if (lastOne === 1) return "st";
    if (lastOne === 2) return "nd";
    if (lastOne === 3) return "rd";
    return "th";
}

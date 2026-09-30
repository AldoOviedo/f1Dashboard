# F1 lite

A lightweight, framework-free reimagining of the Formula 1 website. Vanilla-JS single-page app with a custom client-side router, merging live data from multiple F1 APIs into responsive, team-themed cards.

**Live:** [f1-dashboard-self.vercel.app](https://f1-dashboard-self.vercel.app)


## What it does

- **Home**: the championship leader, the last race with its winner, and the next race on the calendar
- **Standings**: the full driver championship, with team-colored gradients and headshots
- **Races**: the season calendar; completed races glow in the winning team's color and show the winner, and upcoming races stay quiet
- **Drivers**: the current grid, sorted by team, with oversized car numbers behind each headshot

## Under the hood

No framework, no build step. Everything a framework would normally provide was built by hand:

- **Client-side router**: tracks the current page, swaps page modules in and out of a single outlet, and shows a loading spinner while data loads, with an error state if a request fails.
- **Service layer** (`API.js`): the only part of the app that knows where data comes from. Pages ask for data and get back clean, reshaped objects; they never touch a raw API response.
- **Three-API merge**: standings, race results, and driver info each come from a different API, and are joined into single objects (for example, a race plus its winner's photo, team, and team color).
- **Fallback chain**: driver data is loaded live from OpenF1; if that fails, the app falls back to a local JSON snapshot, and if that fails too, pages still render without photos instead of crashing.
- **Caching with request deduplication**: driver data is fetched once per visit. The cache stores the *promise*, not the result, so when two parts of a page request drivers at the same moment, they share a single request instead of both hitting the API.
- **Fetch once, derive locally**: the leader, last race, and next race are computed from data already loaded (`find` / `findLast`), not requested separately. A full page load makes three network requests.
- **Reusable components**: small factory functions build elements and cards, so the same race card renders in the Races grid and on Home.

## Data sources

| API | Used for |
|---|---|
| [OpenF1](https://openf1.org) | Driver info: headshots, team colors, numbers, acronyms |
| [Jolpica](https://github.com/jolpica/jolpica-f1) (Ergast successor) | Championship standings |
| [f1api.dev](https://f1api.dev) | Race calendar, circuits, and winners |

## A debugging story: the missing champion

Lando Norris had won races, but his wins showed up with no photo, name, or team.

The race data and driver data were joined on driver number, and both APIs had a field called `number`. The problem was that they meant different things: f1api.dev used Norris's **permanent** number (4), while OpenF1 used the number he races with as reigning champion (1). The join failed silently: no error, just a missing match.

The fix was to join on the three-letter driver acronym (`NOR`), which means the same thing in every source. The lesson: **a shared field name doesn't guarantee a shared meaning.** Check what the data actually says before trusting it as a key.

A related lesson came later: Jolpica's standings include every driver who scored points this season, while OpenF1 lists only the drivers in the most recent session. A driver who left the grid mid-season has points but no current driver record. The sources weren't wrong; they were answering different questions. The app handles unmatched drivers with a placeholder image and a neutral card color.

## Other things I learned the hard way

- **OpenF1 locks its free tier during live sessions**, and its error responses lack CORS headers, so the browser reports a lockout as a "CORS error." This is what motivated the fallback chain.
- **`fetch` only throws on network failures.** An error status (404, 429, 500) resolves normally, so every request checks `response.ok` and throws explicitly.
- **The browser only repaints when JavaScript pauses**, so a spinner has to be added *before* the `await`, not just before the content.

## Project structure

```
f1Dashboard/
├── index.html
├── index.js            # wires up the nav
├── CSS/
├── JS/
│   ├── router.js       # page state, navigation, spinner, error handling
│   ├── API.js          # service layer: fetch, reshape, merge, cache, fallback
│   ├── elements.js     # element and container factories
│   ├── home.js
│   ├── standings.js
│   ├── races.js
│   └── driverRenders.js
├── data/
│   └── drivers.json    # driver snapshot used as the fallback
└── images/
    └── placeholder.png # headshot fallback
```

## Running locally

No install or build step. The app uses ES modules and fetches a local JSON file, so it needs to be served rather than opened directly as a file. Any static server works, for example:

```bash
npx serve .
```

## Future work

F1 lite is deliberately lightweight. Ideas for a future version:

- **News feed** through a small Spring Boot proxy (`/api/news`) that reads F1's RSS feed, since browsers can't fetch it directly due to CORS
- **Live countdown** to the next race
- **iOS home screen widget** using the same data
- **Router refinements**: a page lookup table instead of if/else, and handling fast tab-switching so a slow response can't overwrite a newer page

## Disclaimer

An unofficial fan project, not affiliated with Formula 1, the FIA, or any team. F1, Formula 1, and related marks are trademarks of Formula One Licensing B.V. Driver photos are served by Formula 1's media servers.
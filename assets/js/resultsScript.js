// Global variables
var dexNum = "488";
var pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/" + dexNum;

// Global page elements
var backBtn = document.getElementById("backBtn");

function pokeApi () {
    fetch(pokeApiUrl)
    .then((response) => response.json())
    .then(function (data) {
        console.log(data);
    })
};

// TODO: Dex number display function
// TODO: Pokemon name display function
// TODO: Pokemon type display function

// Function to check if the given Pokemon is in Pokemon Go.
function poGoCheck () {
    var pkmnGoEl = document.getElementById("pkmnGo");

    fetch("https://pogoapi.net/api/v1/released_pokemon.json")
    .then((response) => response.json())
    .then(function (data) {
        // Change the data object to an array containing only the keys, or dex number in this case.
        var dataArray = Object.keys(data);

        // Checking if the dex number of the given Pokemon is included in the array of Pokemon in Pokemon Go.
        if (dataArray.includes(dexNum)) {
            pkmnGoEl.textContent = "✅"
        } else {
            pkmnGoEl.textContent = "❌"
        }
    })
};

// TODO: Previous Evo check and display function
// TODO: Next Evo check and display function

// TODO: Sprite display function
// TODO: Shiny sprite display function

//TODO: Dex entry description display function

// TODO: Stats display function

// TODO: Learned moves display function

// TODO: Type matchup display function

function homePage() {
    window.location.href = 'home.HTML';
}

// Event listeners
backBtn.addEventListener("click", homePage);

// Functions to run on page load
poGoCheck();
pokeApi();
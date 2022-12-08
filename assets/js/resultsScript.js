// Global variables
var searchArray = loadSearchHistory();
var latestSearch = searchArray[0];
var pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/" + latestSearch;

// Global page elements
var backBtn = document.getElementById("backBtn");

// Call the PokeAPI to be used in the rest of the page
function pokeApi() {
    fetch(pokeApiUrl)
        .then((response) => response.json())
        .then(function (data) {
            console.log(data);
            getDexNum(data);
            getPokeName(data);
            pokeTypes(data);
        })
};

// TODO: Dex number display function
function getDexNum(data) {
    var dexNumEl = document.getElementById("dexNum");
    var dexNum = data.id;

    dexNumEl.textContent = "#" + dexNum;
    poGoCheck(dexNum);
}

// TODO: Pokemon name display function
function getPokeName(data) {
    var pokeNameEl = document.getElementById("pokeName");
    var pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    pokeNameEl.textContent = pokeName;
}


// Pokemon type display function
function pokeTypes(data) {
    var pokeTypeEl = document.getElementById("pokeType");
    var pokeType1 = data.types[0].type.name;
    var pokeType1Text = pokeType1.charAt(0).toUpperCase() + pokeType1.slice(1);

    // Test if the Pokemon has a secondary type
    if (data.types.length > 1) {
        var pokeType2 = data.types[1].type.name;
        var pokeType2Text = pokeType2.charAt(0).toUpperCase() + pokeType2.slice(1);
        pokeTypeEl.textContent = pokeType1Text + " " + pokeType2Text;
    } else {
        pokeTypeEl.textContent = pokeType1Text;
    }
}

// Function to check if the given Pokemon is in Pokemon Go.
function poGoCheck(dexNum) {
    var pkmnGoEl = document.getElementById("pkmnGo");

    fetch("https://pogoapi.net/api/v1/released_pokemon.json")
        .then((response) => response.json())
        .then(function (data) {
            // Change the data object to an array containing only the keys, or dex number in this case.
            var dataArray = Object.keys(data);

            // Checking if the dex number of the given Pokemon is included in the array of Pokemon in Pokemon Go.
            if (dataArray.includes(dexNum.toString())) {
                pkmnGoEl.textContent = "✅"
            } else {
                pkmnGoEl.textContent = "❌"
                console.log(dexNum);
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

// Load the user's previous searches and return them as an array.
function loadSearchHistory() {
    var searchArray = JSON.parse(localStorage.getItem("searches"));

    return searchArray;
};

function homePage() {
    window.location.href = 'home.HTML';
}

// Event listeners
backBtn.addEventListener("click", homePage);

// Functions to run on page load
pokeApi();
loadSearchHistory();

console.log(searchArray);
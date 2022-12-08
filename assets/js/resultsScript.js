// Global variables
var latestSearch = loadSearchHistory();
var pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/" + latestSearch;
var pokeApiSpeciesUrl = "https://pokeapi.co/api/v2/pokemon-species/" + latestSearch;

// Global page elements
var backBtn = document.getElementById("backBtn");

// Call the PokeAPI to be used in the rest of the page
function pokeApi() {
    fetch(pokeApiUrl)
        .then((response) => response.json())
        .then(function (data) {
            console.log(data);
            savePokeInfo(data);
            getDexNum(data);
            getPokeName(data);
            pokeTypes(data);
            regSprite(data);
            shinySprite(data);
        })
};

// Call the PokeAPI Species data to be used in the rest of the page
function pokeApiSpecies() {
    fetch(pokeApiSpeciesUrl)
    .then((response) => response.json())
    .then(function (data) {
        console.log(data);
        dexEntry(data);
    })
}

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
function regSprite(data) {
    var regSpriteEl = document.getElementById("regSprite");
    regSpriteEl.setAttribute("src", data.sprites.front_default);
}

// TODO: Shiny sprite display function
function shinySprite(data) {
    var shinySpriteEl = document.getElementById("shinySprite");
    shinySpriteEl.setAttribute("src", data.sprites.front_shiny);
}

// TODO: Dex entry description display function
function dexEntry(data) {
    var dexEntryEl = document.getElementById("dexEntry");
    var dexEntry = data.flavor_text_entries[6].flavor_text;
    var dexEntryFormat = dexEntry.replace("\n" && "\f", "");

    dexEntryEl.textContent = dexEntryFormat;
}

// TODO: Stats display function

// TODO: Learned moves display function

// TODO: Type matchup display function

// Save the searched Pokemon's info to localStorage to be recalled on home page search history
function savePokeInfo(data) {
    var pokeSprite = (data.sprites.front_default);
    var pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    var dexNum = data.id;

    if (!spriteHistory) {
        var spriteHistory = [pokeSprite];
    } else {
        spriteHistory.unshift(pokeSprite);
    }

    if (!pokeNameHistory) {
        var pokeNameHistory = [pokeName];
    } else {
        pokeNameHistory.unshift(pokeName);
    }

    if (!dexNumHistory) {
        var dexNumHistory = [dexNum];
    } else {
        dexNumHistory.unshift(dexNum);
    }

    localStorage.setItem("spriteHistory", JSON.stringify(spriteHistory));
    localStorage.setItem("pokeNameHistory", JSON.stringify(pokeNameHistory));
    localStorage.setItem("dexNumHistory", JSON.stringify(dexNumHistory));
}

// Load the user's previous searches and return them as an array.
function loadCurrentPoke() {
    var latestSearch = localStorage.getItem("latestSearch");

    return latestSearch;
};

function homePage() {
    window.location.href = 'home.HTML';
}

// Event listeners
backBtn.addEventListener("click", homePage);

// Functions to run on page load
loadCurrentPoke();
pokeApi();
pokeApiSpecies();


console.log(latestSearch);
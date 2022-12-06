var dexNum = "488";

// Pulling in PoGoAPI and then checking to see if the dexNum of the Pokemon the user searched for exists
// in the array containing the dex numbers of Pokemon that are in Pokemon Go.
function poGoCheck () {
    var pkmnGoEl = document.getElementById("pkmnGo");

    fetch("https://pogoapi.net/api/v1/released_pokemon.json")
    .then((response) => response.json())
    .then (function (data) {
        var dataArray = Object.keys(data);

        if (dataArray.includes(dexNum)) {
            console.log("✅ This Pokemon is in Pokemon Go!")
            pkmnGoEl.textContent = "✅"
        } else {
            console.log("❌ This Pokemon is NOT in Pokemon Go!")
            pkmnGoEl.textContent = "❌"
        }
    })
}

poGoCheck();
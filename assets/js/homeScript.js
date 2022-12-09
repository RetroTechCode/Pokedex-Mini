// Global variables
var searchBtn = document.getElementById("searchBtn");
var userInput = document.getElementById("userInput");
var modalText = document.getElementById("modal-text");

var latestSearch = saveSearch();

userInput.value = userInput.value.toLowerCase();

function pokeApi() {
    if (userInput.value.trim() === '') {
        textError();
    } else {
        fetch("https://pokeapi.co/api/v2/pokemon/" + userInput.value)
            .then((response) => response.json())
            .then(function (data) {
                console.log(data);
                saveSearch();
                resultsPage();
            })
            .catch((err) => {
                textError();
                console.log("Error! Please double check your spelling or dex number.")
            })
    };
}

// Add the user's latest search to localStorage
function saveSearch() {
        latestSearch = userInput.value;

    localStorage.setItem("latestSearch", latestSearch);
}

// Call localStorage to display previous searches on the page
function loadSearchHistory() {
    var spriteHistory = JSON.parse(localStorage.getItem("spriteHistory"));
    var pokeNameHistory = JSON.parse(localStorage.getItem("pokeNameHistory"));
    var dexNumHistory = JSON.parse(localStorage.getItem("dexNumHistory"));

    displayHistory(spriteHistory, pokeNameHistory, dexNumHistory);
};

function displayHistory(spriteHistory, pokeNameHistory, dexNumHistory) {
    for (var i = 0; i < 5; i++) {
        var spriteEl = document.getElementById("sprite" + (i+1));
        var nameEl = document.getElementById("name" + (i+1));
        var dexEl = document.getElementById("dex" + (i+1));

        spriteEl.setAttribute("src", spriteHistory[i]);
        nameEl.textContent = pokeNameHistory[i];
        dexEl.textContent = "#" + dexNumHistory[i];
        }
}

// Function for Modals
function textError() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    searchBtn.onclick = function () {
        modal.style.display = "block";
    }
    span.onclick = function () {
        modal.style.display = "none";
    }
};

// Function to move the user to the results page
function resultsPage() {
    window.location.href = 'results.html';
};

// Event listeners
searchBtn.addEventListener("click", pokeApi);

// Run these functions on page load
loadSearchHistory();
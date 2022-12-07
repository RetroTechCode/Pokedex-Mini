// Global variables
var searchBtn = document.getElementById("searchBtn");
var userInput = document.getElementById("userInput");

// Global variables
var searchArray = loadSearchHistory();

function pokeApi() {
    fetch("https://pokeapi.co/api/v2/pokemon/" + userInput.value)
        .then((response) => response.json())
        .then(function (data) {
            console.log(data);
            saveSearch();
            resultsPage();
        })
        .catch((err) => {
            console.log("Error! Please double check your spelling or dex number.")
        })
};

// Add the user's latest search to localStorage
function saveSearch() {
    if (!searchArray) {
        searchArray = [userInput.value]
    } else {
        searchArray.unshift(userInput.value)
    }

    if (searchArray.length > 5) {
        var removeExtra = searchArray.pop();
    }

    localStorage.setItem("searches", JSON.stringify(searchArray));
}

function loadSearchHistory() {
    var searchArray = JSON.parse(localStorage.getItem("searches"));

    return searchArray;
};


// Function to move the user to the results page
function resultsPage() {
    window.location.href = 'results.html';
};


// Event listeners
searchBtn.addEventListener("click", pokeApi);

// Run these functions on page load
loadSearchHistory();
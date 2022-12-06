// Global variables
var searchBtn = document.getElementById("searchBtn");
var userInput = document.getElementById("userInput");

// Global variables
var searchArray = loadSearchHistory();

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
}


// Function to move the user to the results page
function resultsPage () {
    saveSearch();
    console.log("userInput.value: " + userInput.value);
    console.log("searchArray: " + searchArray);

    // if (userInput.value !== '') {
    //     window.location.href = 'results.html';
    // } else {
    //     console.log("Doesn't Work");
    // }
}

// Event listeners
searchBtn.addEventListener ("click", resultsPage);

// Run these functions on page load
loadSearchHistory();
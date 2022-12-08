// Global variables
var searchBtn = document.getElementById("searchBtn");
var userInput = document.getElementById("userInput");
var modalText = document.getElementById("modal-text")
// Global variables
var searchArray = loadSearchHistory();

function pokeApi() {
    if (userInput.value.trim() === '') {
        modalText.textContent = "Error! Please type a Pokemon name or Dex Number!"
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
                modalText.textContent = "Please check Pokemon spelling or Dex Number!";
                textError();
                console.log("Error! Please double check your spelling or dex number.")
            })
    };
}

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
// sessionStorage will need to be used to store the user input across pages
// When the user searches, store that search as an item in BOTH sessionStorage and localStorage
// Use the sessionStorage to fill the API params on the results page
// Use the localStorage to add to the search history on the home page
// When the user selects something from the search history, add that to sessionStorage and use it in the API params,
// and push it back into the front of the localStorage to update the search history.
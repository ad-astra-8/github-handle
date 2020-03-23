'use strict';

function getHandle(username) {
    // console.log('getHandle()');
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (response.ok)
                return response.json()
            throw Error()
        })
        .then(responseJson =>
            displayResults(responseJson))
        .catch(error =>
            alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
    // console.log('displayResults()');
    // console.log(responseJson);
    // if there are previous results, remove them
    $('#results-list').empty();
    // iterate through the array of repos, 
    for (let i = 0; i < responseJson.length; i++) {
        // the result displays a list of username repos
        // for each repo display the repo name and link to the repo URL
        $('#results-list').append(
        `<li>
            <p>Repo name: "${responseJson[i].name}"</p>
            <p>Repo url: <a  href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
        </li>`
        )
    };
    //display the results section  
    $('#results').removeClass('hidden');
};

function watchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        // console.log('watchForm()');
        let username = $("#js-search-username").val();
        // console.log(username);
        getHandle(username);
    });
}

$(function () {
    // console.log('App loaded! Waiting for submit!');
    watchForm();
});
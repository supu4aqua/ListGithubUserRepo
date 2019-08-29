'use strict';

//const apiKey = "065955d54ab34f6091aeef0af6e24f02"

function displayResults(responseJson) {
    // if there are previous results, remove them
    //console.log(responseJson);
    $('#js-error-message').empty();
    $('#results-list').empty();
    if (responseJson.length == 0) {
        $('#js-error-message').text('No repo found');
    }
    //console.log(responseJson.length);
    // iterate through the articles array, stopping at the max number of results
    else {
        for (let i = 0; i < responseJson.length; i++) {

            $('#results-list').append(
                `<p>Repo Name: ${responseJson[i].name}</p><p>Repo Link:<a href="${responseJson[i].url}">${responseJson[i].url}</a></p>`
            )
        };
        //display the results section  
        $('#results').removeClass('hidden');
    }
};

function getRepos(userHandle) {
    const url = 'https://api.github.com/users/' + userHandle + '/repos';

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        //.then(responseJson => console.log(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });

    $('#results-list').empty();
}

function searchRepos() {
    $('form').submit(event => {
        event.preventDefault();
        const userHandle = $('#js-search-term').val();
        //console.log(userHandle);
        getRepos(userHandle);
    });
}

$(searchRepos);
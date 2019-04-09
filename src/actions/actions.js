import * as types from './actionTypes';

/*
The following functions are the action creators.
Call the function to creat an action. An action is a plain
JavaScript object.
 */

export function setFetch() {
    return {type: types.FETCH_STUFF};
}

export function receiveStuff(json, index) {
    if (index === 1) {
        return {type: types.RECEIVE_STUFF, returnData1: json};
    } else {
        return {type: types.RECEIVE_STUFF, returnData2: json};
    }
    //TODO check and make sure what is being passed here,
    // note "It's a good idea to pass as little data in each action as possible.
    // For example, it's better to pass index than the whole object."
}

export function setUrl(url) {
    return {type: types.SET_URL, url: url};
}

export function setQuery(query, index) {
    if(index === 1) {
        return {type: types.SET_QUERY, query1: query};
    } else {
        return {type: types.SET_QUERY, query2: query};
    }
}


/*
function url() {
    return 'www.url.com';
}

export function fetchStuff() {
    return dispatch => {
        return fetch(url(), {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'x-api-key': apiKey,
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => dispatch(receiveStuff(json)));
    };
} */
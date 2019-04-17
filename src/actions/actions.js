import * as types from './actionTypes';

/*
The following functions are the action creators.
Call the function to creat an action. An action is a plain
JavaScript object.
 */

export function setReturnDataAndInfo(json, returnKeys, statusText, index) {
    if (index === 1) {
        return {
            type: types.SET_RECEIVED_DATA,
            returnData: json,
            statusText: statusText,
            returnKeys: returnKeys,
            index: 1
        };
    } else {
        return {
            type: types.SET_RECEIVED_DATA,
            returnData: json,
            statusText: statusText,
            returnKeys: returnKeys,
            index: 2
        };
    }
}

export function setReturnData(json, index) {
    if (index === 1) {
        return {
            type: types.SET_RECEIVED_DATA,
            returnData: json,
            index: 1
        };
    } else {
        return {
            type: types.SET_RECEIVED_DATA,
            returnData: json,
            index: 2
        };
    }
}

export function setUrl(url) {
    return {type: types.SET_URL, url: url};
}

export function setQuery(query, index) {
    if (index === 1) {
        return {type: types.SET_QUERY, query1: query, index: 1};
    } else {
        return {type: types.SET_QUERY, query2: query, index: 2};
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
import initialState from './initialState';
import {FETCH_STUFF, RECEIVE_STUFF, SET_URL, SET_QUERY} from '../actions/actionTypes';

//The reducer is a pure function that takes the previous state and an action, and returns the next state.
export default function returnData(state = initialState, action) {
    switch (action.type) {
        case FETCH_STUFF:
            console.log('FETCH_STUFF Action');
            return action;
        case RECEIVE_STUFF:
            console.log('RECEIVE_STUFF Action');
            return action;
        case SET_QUERY:
            console.log('SET_QUERY Action');
            return action;
        case SET_URL:
            console.log('SET_URL Action');
            return action;
        default:
            return state;
    }
}
//TODO we can break this up into separate reducers
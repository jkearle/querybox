import initialState from './initialState';
import {SET_QUERY} from '../actions/actionTypes';

//The reducer is a pure function that takes the previous state and an action, and returns the next state.
export default function query(state = initialState, action) {
    if (action.type === SET_QUERY) {
        console.log('SET_QUERY Action');
        return action;
    } else {
        return state;
    }
}
//TODO we can break this up into separate reducers
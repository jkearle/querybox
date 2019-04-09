import initialState from './initialState';
import {SET_URL} from '../actions/actionTypes';

//The reducer is a pure function that takes the previous state and an action, and returns the next state.
//Note that we break the reducers into separation of concerns, ie actions that modify the same data
export default function url(state = initialState, action) {
    if (action.type === SET_URL) {
        console.log('SET_URL Action');
        return action;
    } else {
        return state;
    }
}

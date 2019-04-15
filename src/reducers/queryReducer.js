import {SET_QUERY} from '../actions/actionTypes';

const initialState =  {
    query1: '',
    query2: ''
};

//The reducer is a pure function that takes the previous state and an action, and returns the next state.
export default function query(state = initialState, action) {
    if (action.type === SET_QUERY) {
        console.log('SET_QUERY Action');
        return state;
    } else {
        return state;
    }
}
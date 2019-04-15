import {FETCH_STUFF, RECEIVE_STUFF} from '../actions/actionTypes';

const initialState =  {
    returnData1: [],
    returnData2: []
};

//The reducer is a pure function that takes the previous state and an action, and returns the next state.
//Note that a reducer is a pure function. It only computes the next state.
//It should be completely predictable: calling it with the same inputs many times should produce the same outputs.
//It shouldn't perform any side effects like API calls or router transitions.
//These should happen before an action is dispatched.
export default function returnData(state = initialState, action) {
    switch (action.type) {
        case FETCH_STUFF:
            console.log('FETCH_STUFF Action');
            return state;
        case RECEIVE_STUFF:
            console.log('RECEIVE_STUFF Action');
            return state;
        default:
            return state;
    }
}

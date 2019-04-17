import {SET_RECEIVED_DATA} from '../actions/actionTypes';

const initialState =  {
    returnData1: [],
    returnData2: [],
    returnKeys: [],
    statusText: 'Waiting for User'
};

//The reducer is a pure function that takes the previous state and an action, and returns the next state.
//Note that a reducer is a pure function. It only computes the next state.
//It should be completely predictable: calling it with the same inputs many times should produce the same outputs.
//It shouldn't perform any side effects like API calls or router transitions.
//These should happen before an action is dispatched.
export default function returnData(state = initialState, action) {
    if (action.type === SET_RECEIVED_DATA) {
        if(action.index === 1) {
            return Object.assign({}, state, {
                returnData1: action.returnData,
                returnKeys: action.returnKeys,
                statusText: action.statusText
            });
        } else if (action.index === 2){
            return Object.assign({}, state, {
                returnData2: action.returnData,
            });
        }
        return state;
    } else {
        return state;
    }
}

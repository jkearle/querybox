import {SET_RECEIVED_DATA, SET_RECEIVED_DATA_KEYS, SET_RECEIVED_DATA_STATUS} from '../actions/actionTypes';

const initialState = {
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
    switch (action.type) {
        case SET_RECEIVED_DATA:
            if (action.index === 1) {
                return Object.assign({}, state, {
                    returnData1: action.returnData,
                });
            } else if (action.index === 2) {
                return Object.assign({}, state, {
                    returnData2: action.returnData,
                });
            }
            return state;
        case SET_RECEIVED_DATA_KEYS:
            return Object.assign({}, state, {
                returnKeys: action.returnKeys,
            });
        case SET_RECEIVED_DATA_STATUS:
            return Object.assign({}, state, {
                statusText: action.statusText
            });
        default:
            return state;
    }
}


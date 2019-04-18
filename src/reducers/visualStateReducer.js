import {SET_PANEL_STATE, SET_SPLIT_MODE} from "../actions/actionTypes";

const initialState = {
    split: false,
    showPanel: false
};

//The reducer is a pure function that takes the previous state and an action, and returns the next state.
//Note that we break the reducers into separation of concerns, ie actions that modify the same data
export default function visualState(state = initialState, action) {
    switch(action.type) {
        case SET_PANEL_STATE:
            return Object.assign({}, state, {
                showPanel: action.showPanel
            });

        case SET_SPLIT_MODE:
            return Object.assign({}, state, {
                split: action.split
            });
         default:
          return state;
    }
}

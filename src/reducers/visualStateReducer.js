import {
    SET_PANEL_STATE_OPEN,
    SET_PANEL_STATE_CLOSED,
    SET_SHOW_JSON,
    SET_SELECTED_KEYS,
    SET_SPLIT_MODE,
    SET_COMPARISON_INLINE
} from "../actions/actionTypes";

const initialState = {
    split: false,
    showPanel: false,
    queryIndex: 1,
    showJson: false,
    selectedKeys: [],
    comparisonIsInline: true
};

//The reducer is a pure function that takes the previous state and an action, and returns the next state.
//Note that we break the reducers into separation of concerns, ie actions that modify the same data
export default function visualState(state = initialState, action) {
    switch (action.type) {
        case SET_PANEL_STATE_OPEN:
            return Object.assign({}, state, {
                showPanel: true,
                queryIndex: action.queryIndex
            });
        case SET_PANEL_STATE_CLOSED:
            return Object.assign({}, state, {
                showPanel: false,
            });
        case SET_SPLIT_MODE:
            return Object.assign({}, state, {
                split: action.split
            });
        case SET_SHOW_JSON:
            return Object.assign({}, state, {
                showJson: action.showJson
            });
        case SET_SELECTED_KEYS:
            return Object.assign({}, state, {
                selectedKeys: action.selectedKeys
            });
        case SET_COMPARISON_INLINE:
            console.log('value of action' + action);
            return Object.assign({}, state, {
                comparisonIsInline: action.setComparisonInline
            });
        default:
            return state;
    }
}

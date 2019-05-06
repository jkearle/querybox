import {SET_URL} from '../actions/actionTypes';

const initialState = {
    url: 'http://10.12.51.25:9200/offers/offer/_search'
};

//The reducer is a pure function that takes the previous state and an action, and returns the next state.
//Note that we break the reducers into separation of concerns, ie actions that modify the same data
export default function url(state = initialState, action) {
    if (action.type === SET_URL) {
        return Object.assign({}, state, {
            url: action.url
        });
    } else {
        return state;
    }
}

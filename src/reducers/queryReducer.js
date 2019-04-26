import {SET_QUERY} from '../actions/actionTypes';

const initialState =  {
    query1: "{\n" +
        "    \"size\": 100,\n" +
        "    \"query\": {\n" +
        "        \"filtered\": {\n" +
        "            \"filter\": {\n" +
        "                \"missing\": {\n" +
        "                    \"field\": \"editorial_body\"\n" +
        "                }\n" +
        "            }\n" +
        "        }\n" +
        "    }\n" +
        "}",
    query2: "{\n" +
        "    \"size\": 100,\n" +
        "    \"query\": {\n" +
        "        \"filtered\": {\n" +
        "            \"filter\": {\n" +
        "                \"missing\": {\n" +
        "                    \"field\": \"editorial_body\"\n" +
        "                }\n" +
        "            }\n" +
        "        }\n" +
        "    }\n" +
        "}",
};

//The reducer is a pure function that takes the previous state and an action, and returns the next state.
export default function query(state = initialState, action) {
    if (action.type === SET_QUERY) {
        if(action.index === 1) {
            return Object.assign({}, state, {
                query1: action.query
            });
        } else if (action.index === 2){
            return Object.assign({}, state, {
                query2: action.query
            });
        }
        return state;
    } else {
        return state;
    }
}
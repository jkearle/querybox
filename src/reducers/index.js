import {combineReducers} from "redux";
import returnData from './returndataReducer';
import query from './queryReducer';
import url from './urlReducer';

export default combineReducers({
    returnData,//this is the reducer function - but is also the state key name
    url,
    query
});
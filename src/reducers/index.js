import {combineReducers} from "redux";
import returnData from './returndataReducer';
import url from './queryReducer';
import query from './urlReducer';

export default combineReducers({
    returnData,//this is the reducer function
    url,
    query
});
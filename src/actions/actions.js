import * as types from './actionTypes';

/*
The following functions are the action creators.
Call the function to creat an action. An action is a plain
JavaScript object.
 */

export function setReturnDataStatus(statusText) {
    return {
        type: types.SET_RECEIVED_DATA_STATUS,
        statusText: statusText
    };
}

export function setReturnDataKeys(returnKeys) {
    return {
        type: types.SET_RECEIVED_DATA_KEYS,
        returnKeys: returnKeys,
    };
}

export function setReturnData(json, index) {
    return {
        type: types.SET_RECEIVED_DATA,
        returnData: json,
        index: index
    };
}

export function setQuery(query, index) {
    return {
        type: types.SET_QUERY,
        query: query,
        index: index
    };
}

export function setUrl(url) {
    return {type: types.SET_URL, url: url};
}

export function setSplitState(split) {
    return {type: types.SET_SPLIT_MODE, split: split};
}

export function closeQueryPanel() {
    return {
        type: types.SET_PANEL_STATE_CLOSED,
    };
}

export function showQueryPanel(sourceQueryIndex) {
    return {
        type: types.SET_PANEL_STATE_OPEN,
        queryIndex: sourceQueryIndex
    };
}

export function showJson(showJson) {
    return {
        type: types.SET_SHOW_JSON,
        showJson: showJson
    };
}

export function setSelectedKeys(selectedKeys) {
    return {
        type: types.SET_SELECTED_KEYS,
        selectedKeys: selectedKeys
    };
}

export function setComparisonInline(setComparisonInline) {
    console.log('value of setComparisonInline' + setComparisonInline);
    return {
        type: types.SET_COMPARISON_INLINE,
        setComparisonInline: setComparisonInline
    };
}
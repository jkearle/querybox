import React, {Component} from 'react';
import axios from 'axios/index';
import './TopLevel.css';
import {Endpoint, Mode, Panel, Split, ActionButton} from './index.js';
import {connect} from 'react-redux';
import {setReturnDataKeys, setReturnData, setReturnDataStatus, closeQueryPanel} from "../actions/actions";

class TopLevel extends Component {
    constructor(props) {
        super(props);

        document.addEventListener("mousedown", this.handleOffClick.bind(this));
    }

    executeRequests() {
        if (this.props.endpoint) {
            let post = {};
            if (this.props.query1) {
                try {
                    post = JSON.parse(this.props.query1);
                } catch (e) {
                }
            }
            axios.post(this.props.endpoint, post)
                .then(response => {
                    console.log("Axios Response => " + response.toString());

                    let selectKeys = [];
                    if (response.data !== undefined) {
                        this.findAllKeys('', selectKeys, response.data);
                    }
                    this.props.updateReturnData(response,1);
                    this.props.updateReturnDataKeys(selectKeys);
                    this.props.updateReturnDataStatus(' Response Received');
                }).catch(error => {
                this.props.updateReturnDataStatus(' Error occurred => ' + error.message);
            });
            if (this.props.split) {
                axios.post(this.props.endpoint, JSON.parse(this.props.query2))
                    .then(response => {
                        this.props.updateReturnData(
                            response,
                            2
                        );
                    });
            }
            this.props.updateReturnDataStatus(' Fetching');
        }
    }

    findAllKeys(base, keyArray, jsonObject) {
        Object.keys(jsonObject).forEach((keyValue) => {
            if (typeof jsonObject[keyValue] == 'object' && jsonObject[keyValue] !== null) {//If it's an object we need to call this function on the object to get the child keys
                //get the children
                if (jsonObject instanceof Array && keyValue !== '0') {//If it's an array, just iterate over the first one and return on the rest
                    return;
                }
                if (base === '') {
                    this.findAllKeys(keyValue, keyArray, jsonObject[keyValue]);
                } else {
                    this.findAllKeys(base + '.' + keyValue, keyArray, jsonObject[keyValue]);
                }
            } else {
                if (base === '') {
                    keyArray.push({text: keyValue, value: keyValue});
                } else {
                    keyArray.push({text: base + '.' + keyValue, value: base + '.' + keyValue});
                }

            }
        });
    };

    handleOffClick(e) {
        const isQuery = e.target.className === "Query component";
        const isPanel = e.target.className === "Panel visible";
        const isPanelAncestor = e.target.closest(".Panel");
        if (!isQuery && !isPanel && !isPanelAncestor) {
            this.props.closeQueryPanel();
        }
    }

    getPanel(){
        if(this.props.showPanel){
            return <Panel/>;
        }
    }

    render() {
        return (
            <div className="TopLevel">
                <header>
                    QueryBox
                </header>
                <div className="TopLevel-Body">
                    <div className="Body-Top">
                        <div className="Body-Top-Endpoint">
                            <Endpoint/>
                        </div>
                        <div className="Body-Top-Button">
                            <ActionButton text="Go" onClick={() => this.executeRequests()}/>
                        </div>
                    </div>
                    <Mode/>
                    <Split/>
                </div>
                {this.getPanel()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        endpoint: state.url.url,
        query1: state.query.query1,
        query2: state.query.query2,
        showPanel: state.visualState.showPanel,
        split: state.visualState.split,
    };
};

const mapDispatchToProps = {
    updateReturnDataKeys: (jsonKeys) => setReturnDataKeys(jsonKeys),
    updateReturnDataStatus: (statusText) => setReturnDataStatus(statusText),
    updateReturnData: (jsonData, index) => setReturnData(jsonData, index),
    closeQueryPanel,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopLevel);

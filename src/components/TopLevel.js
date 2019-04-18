import React, {Component} from 'react';
import axios from 'axios/index';
import './TopLevel.css';
import {Endpoint, Mode, Panel, Split, ActionButton} from './index.js';
import {connect} from 'react-redux';
import {setReturnDataAndInfo, setReturnData, setPanelDisplayState, setSplitState} from "../actions/actions";

class TopLevel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //split: false,
            //panel: false,
            //endpoint: ``,
            /*query1: "{\n" +
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
                "}",*/
            //query2: "",
            panelQuery: "",
            panelNumber: 0,
        };

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

                    this.props.updateReturnDataAndInfo(
                        response,
                        selectKeys,
                        'Response Received',
                        1
                    );
                }).catch(error => {
                this.props.updateReturnDataAndInfo(//FIXME should we have another reducer that just sets the statusText
                    [],
                    [],
                    'Response Received',
                    1
                );
            });

            if (this.state.split) {
                axios.post(this.state.endpoint, JSON.parse(this.state.query2))
                    .then(response => {
                        this.props.updateReturnData(
                            response,
                            2
                        );
                    });
            }
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

    handleQuery(queryNumber, close = null, state = {}) {
        /*
        let panelQuery = "";
        let panelNumber = 0;
        const panel = this.state.panel;
        if (close === null) {
            close = panel;
        }
        if (close === false && queryNumber === 1) {
            panelQuery = this.props.query1;
            panelNumber = queryNumber;
        } else if (close === false && queryNumber === 2) {
            panelQuery = this.props.query2;
            panelNumber = queryNumber;
        }

        state.panelQuery = panelQuery;
        state.panelNumber = panelNumber;
        if (close === true) {
            state.panel = false;
        } else {
            state.panel = true;
        }*///FIXME ....maybe, moving this to redux may take care of all this handling

        //this.setState(state);
        this.props.setPanelDisplayState(!close)
    }

    handleQuerySave() {
        let panelQuery = this.state.panelQuery;
        let query1 = this.props.query1;
        let query2 = this.props.query2;
        let queryNumber = this.state.panelNumber;
        if (queryNumber === 1) {
            query1 = panelQuery;
        } else if (queryNumber === 2) {
            query2 = panelQuery;
        }

        let state = {query1: query1, query2: query2};
        this.handleQuery(null, true, state);
    }

    handleMode(split) {
        this.props.setSplitState(split);
        //this.setState({split: split})
    }


    handleOffClick(e) {
        const isQuery = e.target.className === "Query component";
        const isPanel = e.target.className === "Panel visible";
        const isPanelAncestor = e.target.closest(".Panel");
        if (!isQuery && !isPanel && !isPanelAncestor) {
            this.props.setPanelDisplayState(false);
            //this.handleQuery(null, true);
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
                    <Split queryClick={(number) => this.handleQuery(number)}/>
                </div>
                <Panel
                    open={this.state.panel}
                    query={this.state.panelQuery}
                    update={(query) => this.setState({panelQuery: query})}
                    save={() => this.handleQuerySave()}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        endpoint: state.url.url,
        query1: state.query.query1,
        query2: state.query.query2,
        split: state.visualState.split,
        panel: state.visualState.showPanel
    };
};

const mapDispatchToProps = {
    updateReturnDataAndInfo: (jsonData, jsonKeys, statusText, index) => setReturnDataAndInfo(jsonData, jsonKeys, statusText, index),
    updateReturnData: (jsonData, index) => setReturnData(jsonData, index),
    setPanelDisplayState:(showPanel) => setPanelDisplayState(showPanel),
    setSplitState: (split) => setSplitState(split)

}

export default connect(mapStateToProps, mapDispatchToProps)(TopLevel);

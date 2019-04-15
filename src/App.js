import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import {Endpoint, Mode, Panel, Split, ActionButton} from './components/index.js';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            split: false,
            panel: false,
            endpoint: `http://10.12.51.25:9200/offers/offer/_search`,
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
            query2: "",
            panelQuery: "",
            panelNumber: 0,
            results1: {},
            results2: {},
            keys: {},
            statusText: 'Waiting for User'
        };

        document.addEventListener("mousedown", this.handleOffClick.bind(this));
    }

    executeRequests() {
        if (this.state.endpoint) {
            let post = {};
            if (this.state.query1) {
                try {
                    post = JSON.parse(this.state.query1);
                } catch (e) {
                }
            }
            axios.post(this.state.endpoint, post)
                .then(response => {
                    console.log("Axios Response => " + response.toString());

                    let selectKeys = [];
                    if (response.data !== undefined) {
                        this.findAllKeys('', selectKeys, response.data);
                    }

                    this.setState({
                        results1: response,
                        statusText: 'Response Received',
                        keys: selectKeys
                    });
                }).catch(error => {
                this.setState({
                    statusText: 'Error occurred => ' + error.message
                });
            });

            if (this.state.split) {
                axios.post(this.state.endpoint, JSON.parse(this.state.query2))
                    .then(response => {
                        this.setState({results2: response})
                    });
            }
        }
    }

    findAllKeys(base, keyArray, jsonObject) {//Candidate for Redux
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
        let panelQuery = "";
        let panelNumber = 0;
        const panel = this.state.panel;
        if (close === null) {
            close = panel;
        }
        if (close === false && queryNumber === 1) {
            panelQuery = this.state.query1;
            panelNumber = queryNumber;
        } else if (close === false && queryNumber === 2) {
            panelQuery = this.state.query2;
            panelNumber = queryNumber;
        }

        state.panelQuery = panelQuery;
        state.panelNumber = panelNumber;
        if (close === true) {
            state.panel = false;
        } else {
            state.panel = true;
        }

        this.setState(state);
    }

    handleQuerySave() {
        let panelQuery = this.state.panelQuery;
        let query1 = this.state.query1;
        let query2 = this.state.query2;
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
        this.setState({split: split})
    }


    handleOffClick(e) {
        const isQuery = e.target.className === "Query component";
        const isPanel = e.target.className === "Panel visible";
        const isPanelAncestor = e.target.closest(".Panel");
        if (!isQuery && !isPanel && !isPanelAncestor) {
            this.handleQuery(null, true);
        }
    }

    render() {
        return (
            <div className="App">
                <header>
                    QueryBox
                </header>
                <div className="App-Body">
                    <div className="Body-Top">
                        <div className="Body-Top-Endpoint">
                            <Endpoint endpoint={this.state.endpoint}
                                      save={(endpoint) => this.setState({endpoint: endpoint})}
                                      statusText={this.state.statusText}/>
                        </div>
                        <div className="Body-Top-Button">
                            <ActionButton text="Go" onClick={() => this.executeRequests()}/>
                        </div>
                    </div>
                    <Mode
                        single={() => this.handleMode(false)}
                        compare={() => this.handleMode(true)}
                        split={this.state.split}
                    />
                    <Split
                        split={this.state.split}
                        query1={this.state.query1}
                        query2={this.state.query2}
                        results1={this.state.results1}
                        results2={this.state.results2}
                        keys={this.state.keys}
                        queryClick={(number) => this.handleQuery(number)}
                    />
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

export default App;

import React, {Component} from 'react';
import './Panel.css'
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-dark.css'
import {connect} from 'react-redux';
import {closeQueryPanel, setQuery, setReturnData, setReturnDataAndInfo} from "../actions/actions";

class Panel extends Component {

    constructor(props) {
        super(props);

        let initialPanelText = '';
            if(this.props.queryIndex === 1){
                initialPanelText =  this.props.query1;
            } else {
                initialPanelText =  this.props.query2;
            }
        this.state = {
            message: "",
            panelText: initialPanelText
        };
    }

    format(json) {
        let formatted = json;
        let message = '';

        if (json !== "") {
            try {
                let parsed = JSON.parse(json);
                formatted = JSON.stringify(parsed, null, 2);
            } catch (e) {
                message =  "This is invalid JSON";
            }
        }
        this.setState({message: message});
        return formatted;
    }

    saveQueryAndClose(){
        this.props.setQuery(this.state.panelText, this.props.queryIndex);
        this.props.closeQueryPanel();
    }


    render() {
        let compClass = "Panel";
        if (this.props.showPanel) {
            compClass = "Panel visible"
        }

        return (
            <div className={compClass}>
                <div className="panel_content">
                    <p className="error">{this.state.message}</p>
                    <button onClick={() => this.saveQueryAndClose()}>Save</button>
                    <div className={'panel_editor'}>
                        <Editor
                            placeholder="Enter your JSON query…"
                            value={this.state.panelText}
                            highlight={code => highlight(code, languages.json)}
                            padding={10}
                            onValueChange={code => this.setState({panelText: this.format(code)})}
                            className="container_editor"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        query1: state.query.query1,
        query2: state.query.query2,
        showPanel: state.visualState.showPanel,
        queryIndex: state.visualState.queryIndex
    };
};

const mapDispatchToProps = {
    updateReturnDataAndInfo: (jsonData, jsonKeys, statusText, index) => setReturnDataAndInfo(jsonData, jsonKeys, statusText, index),
    updateReturnData: (jsonData, index) => setReturnData(jsonData, index),
    closeQueryPanel,
    setQuery: (query, index) => setQuery(query,index),
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
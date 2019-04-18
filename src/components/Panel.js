import React, {Component} from 'react';
import './Panel.css'
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-dark.css'

class Panel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ""
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

    render() {
        let compClass = "Panel";
        if (this.props.open) {
            compClass = "Panel visible"
        }
        return (
            <div className={compClass}>
                <div className="panel_content">
                    <p className="error">{this.state.message}</p>
                    <button onClick={this.props.save}>Save</button>
                    <div className={'panel_editor'}>
                        <Editor
                            placeholder="Enter your JSON query…"
                            value={this.props.query}
                            highlight={code => highlight(code, languages.json)}
                            padding={10}
                            onValueChange={code => this.props.update(this.format(code))}
                            className="container_editor"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Panel;
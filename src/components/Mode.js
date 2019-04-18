import React, { Component } from 'react';
import './Mode.css';
import {setSplitState} from "../actions/actions";
import {connect} from 'react-redux';

class Mode extends Component {
    render() {
        let singleClass = "selected";
        let compareClass = "";
        if (this.props.split) {
            singleClass = "";
            compareClass = "selected";
        }
        return (
            <div className="Mode Component">
                <button className={singleClass} onClick= {() => this.props.setSplitState(false)}>Single</button>
                <button className={compareClass} onClick={() => this.props.setSplitState(true)}>Compare</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        split: state.visualState.split
    };
};

const mapDispatchToProps = {
    setSplitState: (split) => setSplitState(split)
}

export default connect(mapStateToProps, mapDispatchToProps)(Mode);

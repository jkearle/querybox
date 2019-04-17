import React, { Component } from 'react';
import './SplitQuery.css';
import {Query}  from "../components";
import {connect} from 'react-redux';

class SplitQuery extends Component {
    render() {
        const {queryClick} = this.props;

        let secondItem = "SplitItem";
        if (!this.props.split) {
            secondItem += " SplitHidden";
        }

        return (
            <div className="Split">
                <div className="SplitGrid">
                    <div className="SplitItem">
                        <Query query={this.props.query1}
                               onClick={() => queryClick(1)}/>
                    </div>
                    <div className={secondItem}>
                        <Query query={this.props.query2}
                               onClick={() => queryClick(2)}/>
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
    };
};


export default connect(mapStateToProps)(SplitQuery);
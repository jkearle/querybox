import React, {Component} from 'react';
import './SplitQuery.css';
import {Query, UserOptions} from "../components";
import {connect} from 'react-redux';
import {showQueryPanel} from "../actions/actions";

class SplitQuery extends Component {
    render() {
        let secondItem = "SplitItem";
        if (!this.props.split) {
            secondItem += " SplitHidden";
        }

        return (
            <div className="Split">
                <div className="SplitGrid">
                    <div className="SplitItem">
                        <Query query={this.props.query1}
                               onClick={() => this.props.showQueryPanel(1)}/>
                    </div>
                    <div className={'User Options'}>
                        <UserOptions/>
                    </div>
                    <div className={secondItem}>
                        <Query query={this.props.query2}
                               onClick={() => this.props.showQueryPanel(2)}/>
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
        split: state.visualState.split,
    };
};

const mapDispatchToProps = {
    showQueryPanel: (showQueryIndex) => showQueryPanel(showQueryIndex)
};


export default connect(mapStateToProps, mapDispatchToProps)(SplitQuery);
import React, {Component} from 'react';
import './Menu.css';
import {showJson, setSplitState, setComparisonInline} from "../actions/actions";
import {connect} from "react-redux";

class Menu extends Component {


    render() {
        let compClass = "Menu";
        if (this.props.open) {
            compClass = "Menu visible"
        }
        let singleSelection = 'Single';
        let compareSelection = 'Compare';
        if(this.props.split) {
            compareSelection = '-->' + compareSelection;
        }
         else {compareSelection = '   ' + compareSelection;
            singleSelection = '-->' + singleSelection;
        }

        let displayCompare = 'Comparison';
        let displayJson = 'JSON';
        if(this.props.showJson) {
            displayJson = '-->' + displayJson;
        }
        else {
            displayCompare = '-->' + displayCompare;
        }

        let displayInlineComparison = 'Inline';
        let displaySideBySide = 'Side by Side';
        if(this.props.showInlineComparison) {
            displayInlineComparison = '-->' + displayInlineComparison;
        }
        else {
            displaySideBySide = '-->' + displaySideBySide;
        }


        return (
            <div className={compClass}>
                <div className={'SectionHeader'}>
                    Query Options
                </div>
                <hr style={{background: '#a3a3c2', border: 0, height: '2px'}}/>
                <div className={'Selection'} onClick={() => this.props.setSplitState(false)}>
                    {singleSelection}
                </div>
                <div className={'Selection'} onClick={() => this.props.setSplitState(true)}>
                    {compareSelection}
                </div>
                <div className={'SectionHeader'}  >
                    Display Options
                </div>
                <hr style={{background: '#a3a3c2', border: 0, height: '2px'}}/>
                <div className={'Selection'} onClick={() => this.props.setShowJson(false)}>
                    {displayCompare}
                </div>
                <div className={'Selection'}  onClick={() => this.props.setShowJson(true)}>
                    {displayJson}
                </div>
                <div className={'SectionHeader'}>
                    Comparison Options
                </div>
                <hr style={{background: '#a3a3c2', border: 0, height: '2px'}}/>
                <div className={'Selection'}  onClick={() => this.props.setComparisonInline(true)}>
                    {displayInlineComparison}
                </div>
                <div className={'Selection'}  onClick={() => this.props.setComparisonInline(false)}>
                    {displaySideBySide}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        split: state.visualState.split,
        showJson: state.visualState.showJson,
        showInlineComparison: state.visualState.comparisonIsInline
    };
};

const mapDispatchToProps = {
    setShowJson: (jsonKeys) => showJson(jsonKeys),
    setSplitState: (split) => setSplitState(split),
    setComparisonInline: (comparisonInline) => setComparisonInline(comparisonInline)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
import React, {Component} from 'react';
import PropTypes from "prop-types";

export const NO_DIFF = 0,
    SAME = 1,
    DIFFERENT = 2;

const NO_DIFF_COLOR = "white",
    SAME_COLOR = "#9acd32",
    DIFFERENT_COLOR = "#ff4500";


export default class ResultRow extends Component {
    render() {
        const {cellsText, cellsDiffState, rowIndex} = this.props;

        let resultsCells = [];
        let color = NO_DIFF_COLOR;

        if (Array.isArray(cellsText) &&
            (cellsText.length === cellsDiffState.length)) {
            for (let i = 0; i < cellsText.length; i++) {
                let cellDiffState = cellsDiffState[i];
                if (cellDiffState === DIFFERENT) {
                    color = DIFFERENT_COLOR;
                } else if (cellDiffState === SAME) {
                    color = SAME_COLOR;
                }

                let cellStyle = {
                    backgroundColor: color
                };
                resultsCells.push(<td style={cellStyle} key={'Result Row Cell' + rowIndex + ',' + i}>{cellsText[i]}</td>)
            }
        }

        return (
            <tr key={'Result Row ' + rowIndex} >{resultsCells}</tr>
        );
    }
}

ResultRow.propTypes = {
    cellsText: PropTypes.array.isRequired,
    cellsDiffState: PropTypes.array.isRequired,
    rowIndex: PropTypes.number.isRequired
};
import React, {Component} from 'react';
import PropTypes from "prop-types";

export const NO_DIFF_BACKGROUND = 0,
    ADD_SAME_BACKGROUND = 1,
    ADD_DIFF_BACKGROUND = 2,
    REMOVE_SAME_BACKGROUND = 3,
    REMOVE_DIFF_BACKGROUND = 4;

const NO_DIFF_COLOR = "white",
    ADD_SAME_COLOR = "#ffff66",
    ADD_DIFF_COLOR = "#9acd32",
    REMOVE_SAME_COLOR = "#ff4500",
    REMOVE_DIFF_COLOR = "#ff9933";


export default class ResultRow extends Component {
    render() {
        const {cellsText, cellsDiffState, rowIndex} = this.props;

        let resultsCells = [];
        let color = NO_DIFF_COLOR;

        if (Array.isArray(cellsText) &&
            (cellsText.length === cellsDiffState.length)) {
            for (let i = 0; i < cellsText.length; i++) {
                let cellDiffState = cellsDiffState[i];
                if (cellDiffState === REMOVE_DIFF_BACKGROUND) {
                    color = REMOVE_DIFF_COLOR;
                } else if (cellDiffState === REMOVE_SAME_BACKGROUND) {
                    color = REMOVE_SAME_COLOR;
                } else if (cellDiffState === ADD_SAME_BACKGROUND) {
                    color = ADD_SAME_COLOR;
                } else if (cellDiffState === ADD_DIFF_BACKGROUND) {
                    color = ADD_DIFF_COLOR;
                } else {
                    color = NO_DIFF_COLOR;
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
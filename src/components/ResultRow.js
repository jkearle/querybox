import React, {Component} from 'react';

export const NO_DIFF = 0,
    ADD = 1,
    REMOVE = 2;

const NO_DIFF_COLOR = "white",
    ADD_COLOR = "#9acd32",
    REMOVE_COLOR = "#ff4500";


class ResultRow extends Component {
    render() {
        const {cellsText, cellsDiffState} = this.props;

        let resultsCells = [];
        let color = NO_DIFF_COLOR;

        if (Array.isArray(cellsText) &&
            (cellsText.length === cellsDiffState.length)) {
            for (let i = 0; i < cellsText.length; i++) {
                let cellDiffState = cellsDiffState[i];
                if (cellDiffState === REMOVE) {
                    color = REMOVE_COLOR;
                } else if (cellDiffState === ADD) {
                    color = ADD_COLOR;
                } else {
                    color = NO_DIFF_COLOR;
                }

                let cellStyle = {
                    backgroundColor: color
                };

                resultsCells.push(<td style={cellStyle} key={'Result Row Cell' + this.props.index + ',' + i}>{cellsText[i]}</td>)
            }
        }

        return (
            <tr key={'Result Row ' + this.props.index} >{resultsCells}</tr>
        );
    }
}

export default ResultRow;
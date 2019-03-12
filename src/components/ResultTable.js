import React, {Component} from 'react';
import './ResultTable.css'
import Result from './Result'

class ResultTable extends Component {
    render() {

        console.log("Results " + this.props.results);
        //console.log("Results hits" + this.props.results.hits);
        //console.log("Results hits.hits" + this.props.results.hits.hit);

        let results = [];
        if (this.props.results !== undefined &&
            this.props.results.hits !== undefined &&
            this.props.results.hits.hits !== undefined) {
            for (let i = 0; i < this.props.results.hits.hits.length; i++) {
                results.push(<Result result={this.props.results.hits.hits[i]._id} key={i}/>);
                console.log(this.props.results.hits.hits[i]._id);
            }
        }
        return (
            <div className="ResultTable Component">
                <table>
                    <tbody>
                    {results}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ResultTable;
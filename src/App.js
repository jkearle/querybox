import React, { Component } from 'react';
import './App.css';
import Endpoint from './components/Endpoint';
import Mode from './components/Mode';
import Query from './components/Query';
import ResultTable from './components/ResultTable';
import Panel from "./components/Panel";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          QueryBox
        </header>
        <div className="App-Body">
          <Endpoint/>
          <Mode/>
          <Query/>
          <ResultTable/>
        </div>
        <Panel/>
      </div>
    );
  }
}

export default App;

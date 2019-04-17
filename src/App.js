import React, {Component} from 'react';
import './App.css';
import {TopLevel} from './components/index.js';
import {Provider} from 'react-redux';
import reducers from './reducers';
import {createStore} from "redux";


const store = createStore(reducers);

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <TopLevel/>
                </div>
            </Provider>
        );
    }
}

export default App;
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Board from './Board';
import Poll from './Poll';

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route path="/board">
                    <Board />
                </Route>
                <Route path="/">
                    <Poll />
                </Route>
            </Switch>
        </div>
    );
};

export default App;

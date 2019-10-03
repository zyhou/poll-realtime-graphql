import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Board from './Board';
import Poll from './Poll';

const App = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/board">
                        <Board />
                    </Route>
                    <Route path="/">
                        <Poll />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;

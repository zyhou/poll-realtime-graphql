import React from 'react';
import './Board.css';

import HalfCircle from './HalfCircle';

const Board = () => (
    <React.Fragment>
        <h1>Who let the dogs out</h1>
        <div className="halfcircle-container">
            <HalfCircle percent={42} />
            <div className="halfcircle-text">
                <div className="color-left">who</div>
                <div className="color-right">who</div>
            </div>
        </div>
    </React.Fragment>
);

export default Board;

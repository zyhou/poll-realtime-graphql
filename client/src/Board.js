import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './Board.css';

import HalfCircle from './HalfCircle';

const POLL = gql`
    {
        poll {
            question
            anwsers {
                percent
                option
            }
        }
    }
`;

const Board = () => {
    const { loading, error, data } = useQuery(POLL);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const { poll } = data;
    return (
        <React.Fragment>
            <h1>{poll.question}</h1>
            <div className="halfcircle-container">
                <HalfCircle percent={poll.anwsers[0].percent} />
                <div className="halfcircle-text">
                    <div className="color-left">{poll.anwsers[0].option}</div>
                    <div className="color-right">{poll.anwsers[1].option}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Board;

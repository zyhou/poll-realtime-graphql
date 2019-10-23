import React from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './Board.css';

import HalfCircle from './HalfCircle';

const VOTE_SUBSCRIPTION = gql`
    subscription {
        voteAdded {
            percent
            option
        }
    }
`;

const POLL_QUERY = gql`
    {
        poll {
            question
            answers {
                percent
                option
            }
        }
    }
`;

const GraphAnswers = ({ answers }) => {
    const { error, data } = useSubscription(VOTE_SUBSCRIPTION);

    if (error) return <p>Error :(</p>;

    const choices = (data && data.voteAdded) || answers;

    return (
        <div className="halfcircle-container">
            <HalfCircle percent={choices[0].percent} />
            <div className="halfcircle-text">
                <div className="color-left">{choices[0].option}</div>
                <div className="color-right">{choices[1].option}</div>
            </div>
        </div>
    );
};

const Board = () => {
    const { loading, error, data } = useQuery(POLL_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const { poll } = data;

    return (
        <React.Fragment>
            <h1>{poll.question}</h1>
            <GraphAnswers answers={poll.answers} />
        </React.Fragment>
    );
};

export default Board;

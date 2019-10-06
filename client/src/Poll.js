import React from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import './Poll.css';

const ADD_VOTE = gql`
    mutation AddVote($id: ID!, $choice: Int!) {
        addVote(id: $id, choice: $choice) {
            id
            choice
        }
    }
`;

const Poll = () => {
    const [addVote] = useMutation(ADD_VOTE);

    const handleChange = event => {
        addVote({
            variables: { id: 1, choice: parseInt(event.target.value, 10) },
        });
    };

    return (
        <div className="container">
            <label className="radio-left">
                <input
                    type="radio"
                    name="answer"
                    value="1"
                    onChange={handleChange}
                />
                <div>Oui</div>
            </label>
            <label className="radio-right">
                <input
                    type="radio"
                    name="answer"
                    value="2"
                    onChange={handleChange}
                />
                <div>Oui</div>
            </label>
        </div>
    );
};

export default Poll;

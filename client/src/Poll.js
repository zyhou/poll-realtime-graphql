import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import './Poll.css';

const POLL_QUERY = gql`
    {
        poll {
            answers {
                option
            }
        }
    }
`;

const ADD_VOTE = gql`
    mutation AddVote($id: ID!, $choice: Int!) {
        addVote(id: $id, choice: $choice) {
            id
            choice
        }
    }
`;

const Poll = () => {
    const { loading, error, data } = useQuery(POLL_QUERY);

    const [addVote] = useMutation(ADD_VOTE);
    const [disabled, setDisabled] = React.useState(false);

    const handleChange = event => {
        addVote({
            variables: { id: 1, choice: parseInt(event.target.value, 10) },
        });
        setDisabled(!disabled);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const {
        poll: { answers },
    } = data;

    return (
        <div className="container">
            <label className="radio-left">
                <input
                    type="radio"
                    name="answer"
                    value="1"
                    onChange={handleChange}
                    disabled={disabled}
                />
                <div>{answers[0].option}</div>
            </label>
            <label className="radio-right">
                <input
                    type="radio"
                    name="answer"
                    value="2"
                    onChange={handleChange}
                    disabled={disabled}
                />
                <div>{answers[1].option}</div>
            </label>
        </div>
    );
};

export default Poll;

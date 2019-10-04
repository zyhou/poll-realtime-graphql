import React from 'react';
import './Poll.css';

const Poll = () => {
    const handleChange = () => {
        console.log('change');
    };

    return (
        <div className="container">
            <label className="radio-left">
                <input type="radio" name="answer" onChange={handleChange} />
                <div>who</div>
            </label>
            <label className="radio-right">
                <input type="radio" name="answer" onChange={handleChange} />
                <div>who</div>
            </label>
        </div>
    );
};

export default Poll;

const computeAnswersPercent = (votes, answers) => {
    const sumChoice = votes.reduce((result, vote) => {
        result[vote.choice] = (result[vote.choice] || 0) + 1;
        return result;
    }, {});

    const nbVotes = votes.length;
    const answersWithPercent = answers.map((answer, index) => ({
        ...answer,
        percent: Math.round((sumChoice[index + 1] / nbVotes) * 100) || 0,
    }));

    return answersWithPercent;
};

module.exports = {
    computeAnswersPercent,
};

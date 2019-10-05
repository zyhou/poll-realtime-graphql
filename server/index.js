const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Poll {
        question: String!
        anwsers: [Answer]
    }

    type Answer {
        percent: Int
        option: String
    }

    type Vote {
        id: ID!
        choice: Int!
    }

    type Query {
        poll: Poll
    }

    type Mutation {
        addVote(id: ID!, choice: Int!): Vote!
    }
`;

const poll = {
    question: 'On mange burger ?',
    answers: [{ option: 'Oui' }, { option: 'Non' }],
};

const votes = [];

const resolvers = {
    Query: {
        poll: () => ({ ...poll }),
    },
    Poll: {
        anwsers: () => {
            const sumChoice = votes.reduce((result, vote) => {
                result[vote.choice] = (result[vote.choice] || 0) + 1;
                return result;
            }, {});

            const nbVotes = votes.length;
            const answers = poll.answers.map((answer, index) => ({
                ...answer,
                percent:
                    Math.round((sumChoice[index + 1] / nbVotes) * 100) || 0,
            }));

            return answers;
        },
    },
    Mutation: {
        addVote: (_, { id, choice }) => {
            votes.push({ id, choice });
            return { id, choice };
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

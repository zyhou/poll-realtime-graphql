const { ApolloServer, gql, PubSub } = require('apollo-server');

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

    type Subscription {
        voteAdded: Poll
    }
`;

const question = 'On mange burger ?';
const answers = [{ option: 'Oui' }, { option: 'Oui' }];
const votes = [];

const pubsub = new PubSub();
const VOTE_ADDED = 'VOTE_ADDED';

const resolvers = {
    Query: {
        poll: () => ({ question }),
    },
    Poll: {
        anwsers: () => {
            const sumChoice = votes.reduce((result, vote) => {
                result[vote.choice] = (result[vote.choice] || 0) + 1;
                return result;
            }, {});

            const nbVotes = votes.length;
            const answersWithPercent = answers.map((answer, index) => ({
                ...answer,
                percent:
                    Math.round((sumChoice[index + 1] / nbVotes) * 100) || 0,
            }));

            return answersWithPercent;
        },
    },
    Mutation: {
        addVote: (_, { id, choice }) => {
            pubsub.publish(VOTE_ADDED, { voteAdded: { question: 'ui' } });
            votes.push({ id, choice });
            return { id, choice };
        },
    },
    Subscription: {
        voteAdded: {
            subscribe: () => pubsub.asyncIterator([VOTE_ADDED]),
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

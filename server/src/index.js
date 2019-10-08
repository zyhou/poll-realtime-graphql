const { ApolloServer, gql, PubSub } = require('apollo-server');

const { calculAnwsersPercent } = require('./poll');

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
        voteAdded: [Answer]!
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
            return calculAnwsersPercent(votes, answers);
        },
    },
    Mutation: {
        addVote: (_, { id, choice }) => {
            votes.push({ id, choice });
            pubsub.publish(VOTE_ADDED, {
                voteAdded: calculAnwsersPercent(votes, answers),
            });
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

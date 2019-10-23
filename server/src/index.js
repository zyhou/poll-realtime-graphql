const { ApolloServer, gql, PubSub } = require('apollo-server');

const { calculAnswersPercent } = require('./poll');

const typeDefs = gql`
    type Poll {
        question: String!
        answers: [Answer]
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
        answers: [Answer]
    }

    type Mutation {
        addVote(id: ID!, choice: Int!): Vote!
        updatePoll(
            question: String!
            option1: String!
            option2: String!
        ): String!
    }

    type Subscription {
        voteAdded: [Answer]!
    }
`;

let question = 'We eat burger?';
let answers = [{ option: 'Yes' }, { option: 'Yes' }];
let votes = [];

const pubsub = new PubSub();
const VOTE_ADDED = 'VOTE_ADDED';

const resolvers = {
    Query: {
        poll: () => ({ question }),
    },
    Poll: {
        answers: () => {
            return calculAnswersPercent(votes, answers);
        },
    },
    Mutation: {
        addVote: (_, { id, choice }) => {
            votes.push({ id, choice });
            pubsub.publish(VOTE_ADDED, {
                voteAdded: calculAnswersPercent(votes, answers),
            });
            return { id, choice };
        },
        updatePoll: (_, { question: newQuestion, option1, option2 }) => {
            question = newQuestion;
            answers = [{ option: option1 }, { option: option2 }];
            votes = [];
            return 'New Poll Available';
        },
    },
    Subscription: {
        voteAdded: {
            subscribe: () => pubsub.asyncIterator([VOTE_ADDED]),
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

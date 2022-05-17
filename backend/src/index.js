require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const { rule, shield } = require("graphql-shield");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { applyMiddleware } = require("graphql-middleware");

const token = require('./utils/token');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const dataSources = require('./datasources');

const context = ({ req, res }) => {

  const context = {
    req,
    res,
    user: null,
    token: null
  };

  if (req.headers?.authorization) {
    context.token = req.headers?.authorization;
    context.user = token.decode(req.headers?.authorization);
  }

  return context;
};

const isAuthenticated = rule()((parent, args, context) => {
  return context.user != null;
});

const permissions = shield({
  Query: {
    bikes: isAuthenticated,
    bike: isAuthenticated,
    currentUser: isAuthenticated
  }
});

const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }),
  permissions

);

const server = new ApolloServer({
  schema: schema,
  context: context,
  dataSources: () => (dataSources),
  cors: {
    origin: "*",
    methods: "GET,HEAD,POST"
  }
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
  `);
});
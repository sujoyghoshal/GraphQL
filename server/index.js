const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config()
//console.log(process.env)
const port = process.env.PORT || 4000;

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
      type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        phone: String!
        website: String!
      }
      type Todo {
        id: ID!
        title: String!
        completed: Boolean
      }

      type Query {
        getTodos: [Todo]
        getAllUsers: [User]
        getUser(id: ID!): User
      }
    `,
    resolvers: {
      Query: {
        getTodos: async () => 
          (await axios.get('https://jsonplaceholder.typicode.com/posts')).data,
        getAllUsers: async () => 
          (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
        getUser: async (parent, { id }) => 
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();
  app.use('/graphQl', expressMiddleware(server)); // Match this with the client

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();

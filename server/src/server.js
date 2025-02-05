import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
import { fileURLToPath } from 'url';
import { authenticateToken } from './utils/api/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  
  // Enable CORS for all routes
  app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
  }));
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server,{
    context: authenticateToken 
  }));
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();

# Talker - AI Therapist Chat Application

A full-stack web application that provides AI-powered therapy conversations using OpenAI's GPT-4 API.

## Features

- User authentication (login/signup)
- Personalized welcome messages
- Real-time chat interface with AI therapist
- Secure JWT-based authentication
- GraphQL API with Apollo Server
- Modern React frontend with beautiful UI

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- OpenAI API key

## Setup

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Configuration

The application is configured with default values, but you can set up environment variables:

- `MONGODB_URI`: MongoDB connection string (default: mongodb://127.0.0.1:27017/talker)
- `JWT_SECRET_KEY`: JWT secret for authentication (default: your-secret-key-here)
- `OPENAI_API_KEY`: OpenAI API key (configured in code)

### 3. Start the Application

```bash
# Start the server (from server directory)
cd server
npm start

# Start the client (from client directory, in a new terminal)
cd client
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- GraphQL API: http://localhost:3001/graphql

## Usage

1. Visit the homepage and click "Create Account" or "Login"
2. Create an account with your first name, last name, username, and password
3. After logging in, you'll see a personalized welcome message
4. Click "Start Conversation?" to begin chatting with the AI therapist
5. Type your messages and receive empathetic, therapeutic responses

## Technology Stack

- **Frontend**: React, Apollo Client, React Router
- **Backend**: Node.js, Express, Apollo Server, GraphQL
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **AI**: OpenAI GPT-4 API
- **Styling**: CSS with modern gradients and animations

## Project Structure

```
Talker/
├── client/                 # React frontend
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── css/               # Stylesheets
│   └── utils/             # GraphQL mutations
└── server/                # Node.js backend
    ├── src/
    │   ├── models/        # MongoDB models
    │   ├── schemas/       # GraphQL schemas
    │   ├── utils/         # API utilities
    │   └── config/        # Database configuration
```

## Security Notes

- The OpenAI API key is currently hardcoded for development
- JWT secret should be changed in production
- User passwords are hashed using bcrypt
- Authentication middleware protects GraphQL endpoints

# Talker - AI Mental Health Companion

A full-stack web application that provides AI-powered mental health support using OpenAI's GPT-4 API. Features a modern, responsive interface with personalized user profiles and formatted AI responses.

![Talker Interface](client/src/assets/interface-1.png)

## Features

- **User Authentication**: Secure login and account creation with JWT tokens
- **Personalized Dashboard**: User profile sidebar with complete profile information
- **AI Therapy Sessions**: Real-time conversations with an empathetic AI therapist
- **Markdown Formatting**: Beautifully formatted AI responses with headers, lists, and emphasis
- **Responsive Design**: Modern UI with gradient backgrounds and smooth animations
- **Profile Management**: Complete user profiles with all information displayed
- **Secure API**: GraphQL backend with proper authentication and validation

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

Create a `.env` file in the server directory:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/talker
JWT_SECRET_KEY=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key-here
```

### 3. Database Seeding

Populate the database with sample users for testing:

```bash
cd server
npm run seed
```

This will create 10 sample users with the following credentials:

- **Username**: johndoe, **Password**: Password123
- **Username**: sarahw, **Password**: Password123
- **Username**: mchen, **Password**: Password123
- And 7 more users with realistic mental health goals

### 4. Start the Application

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

1. **Homepage**: Visit the landing page with login and create account options
2. **Account Creation**: Fill out the complete registration form with all required fields
3. **Dashboard**: After login, view your profile information in the sidebar
4. **Start Conversation**: Click "Start Conversation?" to begin chatting with the AI
5. **AI Therapy**: Receive formatted, empathetic responses with proper markdown formatting
6. **Profile Management**: View and manage your complete profile information

## Key Components

### Frontend

- **Dashboard**: Main user interface with profile sidebar and chat area
- **UserProfile**: Dedicated component for displaying user information
- **ConversationBox**: Chat interface with markdown-formatted AI responses
- **Banner**: Landing page with authentication forms
- **Responsive Design**: Modern CSS with gradients and animations

### Backend

- **GraphQL API**: Type-safe API with proper validation
- **User Model**: Complete user schema with all required fields
- **Authentication**: JWT-based security with bcrypt password hashing
- **AI Integration**: OpenAI GPT-4 for therapeutic conversations

## GraphQL Schema

### User Object (userData)

```graphql
type userData {
  _id: ID!
  firstName: String!
  lastName: String!
  email: String!
  age: Int!
  gender: String!
  dob: String!  # Date of birth in YYYY-MM-DD format
  username: String!
  password: String!
  userEmotion: String!  # Current emotional state
  conversations: [OpenAiResponse!]
  date: String!  # Account creation date
}

# Example user data:
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "age": 28,
  "gender": "Male",
  "dob": "1995-03-15",
  "username": "johndoe",
  "password": "$2b$10$hashedPassword...",
  "userEmotion": "Anxious",
  "conversations": ["64f8a1b2c3d4e5f6a7b8c9d1"],
  "date": "2023-09-06T10:30:00.000Z"
}
```

### AI Response Object (OpenAiResponse)

```graphql
type OpenAiResponse {
  _id: ID!
  userText: String!
  aiResponse: String!
  createdAt: String!
}

# Example AI response:
{
  "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
  "userText": "I've been feeling really stressed about work lately",
  "aiResponse": "# Understanding Your Work Stress\n\nI hear that work has been taking a toll on you. Let's explore this together...",
  "createdAt": "2023-09-06T10:35:00.000Z"
}
```

### Authentication Object (Auth)

```graphql
type Auth {
  token: String
  user: userData
}

# Example authentication response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "age": 28,
    "gender": "Male",
    "dob": "1995-03-15",
    "username": "johndoe",
    "userEmotion": "Anxious",
    "conversations": ["64f8a1b2c3d4e5f6a7b8c9d1"],
    "date": "2023-09-06T10:30:00.000Z"
  }
}
```

### Input Types

#### Profile Input (for user creation)

```graphql
input ProfileInput {
  firstName: String!
  lastName: String!
  email: String!
  username: String!
  password: String!
  age: Int!
  gender: String!
  dob: String!
  userEmotion: String!
}

# Example profile input:
{
  "firstName": "Sarah",
  "lastName": "Wilson",
  "email": "sarah.wilson@example.com",
  "username": "sarahw",
  "password": "SecurePassword123",
  "age": 32,
  "gender": "Female",
  "dob": "1991-07-22",
  "userEmotion": "Looking for stress management techniques"
}
```

### Available Mutations

```graphql
type Mutation {
  # Create a new user account
  createUser(input: ProfileInput!): Auth

  # Authenticate existing user
  loginUser(username: String!, password: String!): Auth

  # Update user's current emotion
  updateUserEmotion(userId: ID!, userEmotion: String!): userData

  # Get AI therapy response
  getTherapyResponse(userText: String!): OpenAiResponse
}
```

### Available Queries

```graphql
type Query {
  _: Boolean # Placeholder for future queries
}
```

## Technology Stack

- **Frontend**: React 18, Apollo Client, React Router v6, React Markdown
- **Backend**: Node.js, Express, Apollo Server, GraphQL
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt hashing
- **AI**: OpenAI GPT-4 API
- **Styling**: Modern CSS with gradients, animations, and responsive design
- **Markdown**: React Markdown for formatted AI responses

## Project Structure

```
Talker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ConversationBox.jsx    # Chat interface with markdown
│   │   │   └── UserProfile.jsx        # User profile sidebar
│   │   ├── pages/         # Page components
│   │   │   ├── Dashboard.jsx          # Main user interface
│   │   │   ├── banner.jsx             # Landing page
│   │   │   ├── Login.jsx              # Login form
│   │   │   └── CreateAccount.jsx      # Registration form
│   │   ├── styles/        # Stylesheets
│   │   └── utils/         # GraphQL mutations
└── server/                # Node.js backend
    ├── src/
    │   ├── models/        # MongoDB models
    │   ├── schemas/       # GraphQL schemas and resolvers
    │   ├── utils/         # API utilities and authentication
    │   └── config/        # Database configuration
    └── seed.js            # Database seeding script
```

## Recent Updates

- **Dashboard Redesign**: Renamed Personal to Dashboard with improved layout
- **UserProfile Component**: Separated profile logic into dedicated component
- **Markdown Support**: Added react-markdown for formatted AI responses
- **Database Schema**: Updated with all required user fields
- **Security**: Moved API keys to environment variables
- **UI Improvements**: Better profile display and responsive design
- **Database Seeding**: Added comprehensive seed file with sample users

## Security Features

- **Environment Variables**: All sensitive data stored in .env files
- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive form validation on both client and server
- **GraphQL Security**: Protected endpoints with authentication middleware

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

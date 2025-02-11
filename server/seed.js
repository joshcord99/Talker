import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// Import the user model
import userData from "./src/models/userModel.js";

// Sample users data
const sampleUsers = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    password: "Password123",
    age: 28,
    gender: "Male",
    dob: "1995-03-15",
    userEmotion: "Feeling anxious about work",
  },
  {
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@example.com",
    username: "sarahw",
    password: "Password123",
    age: 32,
    gender: "Female",
    dob: "1991-07-22",
    userEmotion: "Looking for stress management techniques",
  },
  {
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@example.com",
    username: "mchen",
    password: "Password123",
    age: 25,
    gender: "Male",
    dob: "1998-11-08",
    userEmotion: "Dealing with relationship issues",
  },
  {
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily.rodriguez@example.com",
    username: "emilyr",
    password: "Password123",
    age: 29,
    gender: "Female",
    dob: "1994-05-12",
    userEmotion: "Struggling with self-confidence",
  },
  {
    firstName: "David",
    lastName: "Thompson",
    email: "david.thompson@example.com",
    username: "dthompson",
    password: "Password123",
    age: 35,
    gender: "Male",
    dob: "1988-09-30",
    userEmotion: "Managing work-life balance",
  },
  {
    firstName: "Lisa",
    lastName: "Johnson",
    email: "lisa.johnson@example.com",
    username: "lisaj",
    password: "Password123",
    age: 27,
    gender: "Female",
    dob: "1996-01-18",
    userEmotion: "Coping with grief and loss",
  },
  {
    firstName: "Alex",
    lastName: "Martinez",
    email: "alex.martinez@example.com",
    username: "alexm",
    password: "Password123",
    age: 31,
    gender: "Non-binary",
    dob: "1992-12-03",
    userEmotion: "Exploring identity and purpose",
  },
  {
    firstName: "Rachel",
    lastName: "Brown",
    email: "rachel.brown@example.com",
    username: "rachelb",
    password: "Password123",
    age: 26,
    gender: "Female",
    dob: "1997-06-25",
    userEmotion: "Building healthy habits",
  },
  {
    firstName: "James",
    lastName: "Davis",
    email: "james.davis@example.com",
    username: "jamesd",
    password: "Password123",
    age: 33,
    gender: "Male",
    dob: "1990-04-14",
    userEmotion: "Overcoming addiction",
  },
  {
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.garcia@example.com",
    username: "mariag",
    password: "Password123",
    age: 30,
    gender: "Female",
    dob: "1993-08-07",
    userEmotion: "Managing anxiety and depression",
  },
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/talker"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Hash password function
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Seed the database
const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");

    // Clear existing users
    await userData.deleteMany({});
    console.log("Cleared existing users");

    // Create new users with hashed passwords
    const usersToInsert = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password),
        dob: new Date(user.dob),
        conversations: [],
        date: new Date(),
      }))
    );

    // Insert users
    const insertedUsers = await userData.insertMany(usersToInsert);
    console.log(`Successfully seeded ${insertedUsers.length} users`);

    // Display sample login credentials
    console.log("\n=== Sample User Credentials ===");
    sampleUsers.forEach((user, index) => {
      console.log(
        `${index + 1}. Username: ${user.username} | Password: ${user.password}`
      );
    });

    console.log("\nDatabase seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userData from "./src/models/userModel.js";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/talker";

const seedUsers = [
  {
    firstName: "Sunny",
    lastName: "User",
    username: "sunny@gmail.com",
    password: "SunnyApple123",
    age: 25,
    gender: "Not specified",
    dob: new Date("1998-01-01"),
    userEmotion: "Happy",
    date: new Date(),
  },
  {
    firstName: "Willy",
    lastName: "Wonka",
    username: "willy@gmail.com",
    password: "WillyWonka123",
    age: 30,
    gender: "Not specified",
    dob: new Date("1993-01-01"),
    userEmotion: "Excited",
    date: new Date(),
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing users
    await userData.deleteMany({});
    console.log("Cleared existing users");

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      seedUsers.map(async (user) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // Insert users
    const createdUsers = await userData.insertMany(hashedUsers);
    console.log("Successfully seeded users:");
    createdUsers.forEach((user) => {
      console.log(`- ${user.firstName} ${user.lastName} (${user.username})`);
    });

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

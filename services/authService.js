import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "./emailService.js";
import crypto from "crypto";

export async function registerUser(username, email, password) {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires,
      isVerified: false,
    });

    await newUser.save();

    await sendVerificationEmail(email, verificationToken);

    return {
      user: newUser,
    };
  } catch (error) {
    throw new Error("Error registering user: " + error.message);
  }
}

export async function loginUser(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (!user.isVerified) {
      throw new Error("Please verify your email before logging in");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    if (!process.env.TOKEN_SECRET) {
      console.error("JWT_SECRET is missing in environment variables");
      throw new Error("Server configuration error");
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
}

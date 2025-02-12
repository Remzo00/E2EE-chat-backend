import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Error registering user");
  }
};

export const loginUser = async (email, password) => {
  if (!process.env.TOKEN_SECRET) {
    throw new Error("TOKEN_SECRET is not defined");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { email: user.email, id: user._id, username: user.username },
    process.env.TOKEN_SECRET,
    { expiresIn: "24h" }
  );

  return {
    token,
    user: {
      _id: user._id,
      email: user.email,
      username: user.username,
    },
  };
};

import User from "../models/user.js";

export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

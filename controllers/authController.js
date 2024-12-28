import { registerUser, loginUser } from "../services/authService.js";

export async function register(req, res) {
  const { username, email, password } = req.body;
  try {
    const newUser = await registerUser(username, email, password);
    console.log("Request body:", req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error: error.message });
  }
}

import { registerUser, loginUser } from "../services/authService.js";
import { verifyEmail } from "../services/emailService.js";
import User from "../models/user.js";

export async function register(req, res) {
  const { username, email, password, captchaToken } = req.body;
  try {
    const newUser = await registerUser(username, email, password, captchaToken);
    res.status(201).json({
      message:
        "Registration successful. Please check your email for verification.",
      user: {
        email: newUser.user.email,
        username: newUser.user.username,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ message: error.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error: error.message });
  }
}

export async function verifyEmailToken(req, res) {
  const { token } = req.params;
  try {
    await verifyEmail(token);
    res.status(200).json({ message: "Email successfully verified" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

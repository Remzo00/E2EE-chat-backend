import nodemailer from "nodemailer";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: true,
  port: 465,
});

export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `http://localhost:5173/verify/${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verifikacija email adrese",
    html: `
        <h1>Dobrodošli!</h1>
        <p>Molimo vas da verifikujete vašu email adresu klikom na link ispod:</p>
        <a href="${verificationLink}">Verifikuj email</a>
        <p>Link ističe za 24 sata.</p>
      `,
  };

  await transporter.sendMail(mailOptions);
};

export const verifyEmail = async (verificationToken) => {
  const user = await User.findOne({
    verificationToken,
    verificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Invalid or expired verification token");
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();

  return user;
};

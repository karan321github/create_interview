const Company = require("../models/company");
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); // For generating verification code
const nodemailer = require("nodemailer"); // For sending verification emails

const registerCompany = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if company already exists
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.status(400).json({
        success: false,
        message: "Company already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Generate verification code
    const verificationCode = crypto.randomBytes(20).toString("hex");
    const verificationExpiry = Date.now() + 3600000; // 1 hour from now

    // Create new company
    const newCompany = new Company({
      name,
      email,
      password: hashedPassword,
      verificationCode,
      verificationExpiry,
      isVerified: false,
    });

    // Save company to the database
    await newCompany.save();

    // Send verification email
    sendVerificationEmail(newCompany.email, verificationCode);

    res.status(201).json({
      success: true,
      message: "Company registered successfully. Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error occurred. Please try again later.",
      error: error.message,
    });
  }
};


import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Function to create a JWT token
// It's good practice to define this once and reuse it.
const createToken = (id) => {
  // Adding an expiration date is important for security
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
       
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Return an error message if the passwords don't match
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // If login is successful, create a token
    const token = createToken(user._id);

    // Return success and the token
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  console.log(name, password, email);

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password (at least 8 characters)",
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const user = await newUser.save();

    // Create a token for the new user
    const token = createToken(user._id);

    // Send a successful response with the token
    res.json({ success: true, token }); // Renamed 'message' to 'token' for consistency
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };

// import mongoose from "mongoose";
// import validator from "validator";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter your Name!"],
//     minLength: [3, "Name must contain at least 3 Characters!"],
//     maxLength: [30, "Name cannot exceed 30 Characters!"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please enter your Email!"],
//     validate: [validator.isEmail, "Please provide a valid Email!"],
//   },
//   phone: {
//     type: Number,
//     required: [true, "Please enter your Phone Number!"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please provide a Password!"],
//     minLength: [8, "Password must contain at least 8 characters!"],
//     maxLength: [32, "Password cannot exceed 32 characters!"],
//     select: false,
//   },
//   role: {
//     type: String,
//     required: [true, "Please select a role"],
//     enum: ["Job Seeker", "Employer"],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// //ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

// //COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// //GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH.
// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });
// };

// export const User = mongoose.model("User", userSchema);

// import mongoose from "mongoose";
// import validator from "validator";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Please enter your Name!"],
//     minLength: [3, "Name must contain at least 3 Characters!"],
//     maxLength: [30, "Name cannot exceed 30 Characters!"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please enter your Email!"],
//     validate: [validator.isEmail, "Please provide a valid Email!"],
//   },
//   phone: {
//     type: Number,
//     required: [true, "Please enter your Phone Number!"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please provide a Password!"],
//     minLength: [8, "Password must contain at least 8 characters!"],
//     maxLength: [32, "Password cannot exceed 32 characters!"],
//     select: false,
//   },
//   role: {
//     type: String,
//     required: [true, "Please select a role"],
//     enum: ["Job Seeker", "Employer"],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// //ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

// //COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// //GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH.
// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// export const User = mongoose.model("User", userSchema);

//testing

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false, // Don't return the password by default
  },
  role: {
    type: String,
    required: [true, "Please select a role"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password before saving user
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Hash the password with a cost factor of 10
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    // Compare the entered password with the hashed password
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

// Generate JWT token for user authentication
userSchema.methods.getJWTToken = function () {
  // Sign the token with user ID and secret key
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE, // Token expiration time
  });
};

// Export the User model
export const User = mongoose.model("User", userSchema);

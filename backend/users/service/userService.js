const express = require("express");
const bcrypt = require("bcrypt");

const userRepository = require("../repository/userRepository");

const registerUser = async (user, callback) => {
  try {
    const userExists = await userRepository.getUserByEmail(user.email); //Check if user already exists
    if (userExists !== null) {
      console.log("User already exists", userExists);
      callback(null, "User already exists");
      return;
    }
    // Hashing the password
    const salt = bcrypt.genSaltSync(10);
    const Hash = bcrypt.hashSync(user.password, salt);
    console.log("came here after hash");

    //Creating new user object
    const newUser = {
      username: user.username,
      gender: user.gender,
      date_of_birth: user.date_of_birth,
      mobile: user.mobile,
      role_id: user.role_id,
      email: user.email,
      passwordHash: Hash,
      passwordSalt: salt,
    };
    console.log("created newUser");
    //Adding new user to the database
    await userRepository.addNewUser(newUser, (err, createdUser) => {
      if (!err) {
        console.log("createdUser: ", createdUser);
        callback(null, "User registered successfully");
      } else {
        console.log("Error registering user from else: ", err.message); //Shows error if table name is incorrect
        callback(err, null);
      }
    });
  } catch (error) {
    console.log("Error registering user from catch: ", error);
    throw error;
  }
};

const loginUser = async (user, callback) => {
  try {
    const userExists = await userRepository.getUserByEmail(user.email);
    if (userExists === null) {
      callback(null, "User does not exist");
      return;
    } 
    console.log("user password: ", user.password);
    console.log("userExists.password_hash: ", userExists);
    const validPassword = await bcrypt.compare(user.password, userExists.password_hash);
    console.log("validPassword: ", validPassword);
    if (!validPassword) {
      callback(null, "Invalid password");
      return;
    }

    await userRepository.updateLastLogin(userExists.user_id, (err, updatedUser) => {
      if (!err) {
        console.log("updatedUser from : ", updatedUser);
        callback(null, updatedUser);
      } else {
        console.log("Error updating last login: ", err.message);
        callback(err, null);
      }
    });
    
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

module.exports = { registerUser, loginUser };

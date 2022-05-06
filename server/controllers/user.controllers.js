import User from "../models/user.model.js";
import _ from "lodash";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

/**
 * user coontrollers:
 * 1. addUser: registers a new user
 * 2. getUserById:
 * 4. getAllUsers: list all the users
 * 4. updateUser: update some user's fields
 * 5. deleteUser: delete the user
 */

// register a new user
const addUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// get user by ID
const getUserById = async (req, res) => {
  let user;
  const userId = req.params.userId;
  try {
    user = await User.find(
      { _id: ObjectId(userId) },
      "_id fullname email role address.district"
    );
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// get all registered users
const getAllUsers = async (req, res) => {
  let users;

  try {
    users = await User.find(
      {},
      "_id fullname email role address.district"
    );
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// update an already-registered user
const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { name, role } = req.body;

  try {
    let user = await User.findOneAndUpdate(
      { _id: ObjectId(userId) },
      { name, role },
      { runValidators: true, new: true }
    );
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

// delete a registered user
const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    let user = await User.deleteOne({ _id: ObjectId(userId) });
    return res.status(200).json({
      message: "O utilizador foi eliminado com sucesso",
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

export default { addUser, getUserById, getAllUsers, updateUser, deleteUser };

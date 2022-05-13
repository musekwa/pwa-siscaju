import userService from "../services/user.services.js";
import _ from "lodash";
import expressValidator from "express-validator";

const {
  getAllUsersService,
  addUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} = userService;
const { body, validationResult } = expressValidator;

/**
 * user coontrollers:
 * 1. addUser: registers a new user
 * 2. getUserById:
 * 4. getAllUsers: list all the users
 * 4. updateUser: update some user's fields
 * 5. deleteUser: delete the user
 */

// get all registered users
const getAllUsers = async (req, res) => {
  try {
    let users = await getAllUsersService();
    if (!users) {
      res.status(404).send({
        status: "NOT FOUND",
        message: "Utilizadores nao encontrados",
      });
    }
    res.status(200).send({
      status: "OK",
      data: users,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

// register a new user
const addUser = async (req, res) => {
  const { body } = req;
  if (!body.fullname || !body.email || !body.hashedPassword || !body.role) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "Alguns campos de dados obrigatorios sao vazios: fullname, email, password, role",
      },
    });
  }

  try {
    let savedUser = await addUserService(body);
    res.status(201).send({
      status: "OK",
      data: savedUser,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

// get user by ID
const getUserById = async (req, res) => {
  // const userId = req.params.userId;
  const {
    params: { userId },
  } = req;
  if (!userId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "O parametro ':userId' nao pode ser vazio" },
    });
  }
  try {
    let foundUser = await getUserByIdService(userId);
    if (!foundUser) {
      res.status(404).send({
        status: "NOT FOUND",
        message: "Utilizador nao encontrado",
      });
    }
    res.status(200).send({
      status: "OK",
      data: foundUser,
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

// update an already-registered user
const updateUser = async (req, res) => {
  const {
    body,
    params: { userId },
  } = req;

  if (!userId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }

  try {
    let updatedUser = await updateUserService(userId, body);
    if (!updatedUser) {
      res.status(404).send({
        status: "NOT FOUND",
        message: "Utilizador nao encontrado",
      });
    }
    res.status(200).send({
      status: "OK",
      data: updatedUser,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

// delete a registered user
const deleteUser = async (req, res) => {
  const {
    params: { userId },
  } = req;

  if (!userId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }

  try {
    let deletionResult = await deleteUserService(userId);
    res.status(204).send(deletionResult);
  } catch (err) {
    return res.status(error?.error || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

export default { addUser, getUserById, getAllUsers, updateUser, deleteUser };

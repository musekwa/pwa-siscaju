import {
  loginService,
  getUsersService,
  getUsersByRoleService,
  addUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services/user.services.js";
import _ from "lodash";
import expressValidator from "express-validator";

const { body, validationResult } = expressValidator;

// login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      status: "FAILED",
      message: "Deve especificar 'email' e 'password'!",
    });
  }

  try {
    let user = await loginService({ email, password });
    res.status(201).send({
      status: "OK",
      data: user,
    });
    next()
  } catch (error) {
    return res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};

// get all registered users
const getUsers = async (req, res) => {
  const {
    query: { role },
  } = req;

  try {
    let users;
    if (role) {
      users = await getUsersByRoleService(role);
    } else {
      users = await getUsersService();
    }

    if (!users) {
      return res.status(404).send({
        status: "NOT FOUND",
        message: "Utilizadores nao encontrados",
      });
    }
    return res.status(200).send({
      status: "OK",
      data: users,
    });
  } catch (error) {
    return res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

// register a new user
const addUser = async (req, res) => {
  const { body } = req;
  if (!body.fullname || !body.email || !body.password || !body.role) {
    return res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "Alguns campos de dados obrigatorios sao vazios: fullname, email, password, role",
      },
    });
  }

  try {
    let savedUser = await addUserService(body);
    return res.status(201).send({
      status: "OK",
      data: savedUser,
    });
  } catch (error) {
    return res.status(error?.status || 500).send({
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

export { login, addUser, getUserById, getUsers, updateUser, deleteUser };

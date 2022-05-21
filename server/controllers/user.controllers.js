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
import jwt from "jsonwebtoken";
import { generateToken } from "../middleware/authMiddleware.js";
const { body, validationResult } = expressValidator;



//@desc login
//@route
//@access
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    // return res.status(400).send({
    //   status: "FAILED",
    //   message: "Deve especificar 'email' e 'password'!",
    // });
    res.status(400);
    throw new Error("Deve especificar 'email' e 'password'!");
  }

  try {
    let user = await loginService({ email, password });

    // 
    res.status(201).send({
      status: "OK",
      data: { ...user._doc, token: generateToken(user._id) },
    });
    return;
  } catch (error) {
    // return res.status(error?.status || 500).send({
    //   status: "FAILED",
    //   data: { error: error?.error || error },
    // });
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

//@desc
//@route
//@access
const getUsers = async (req, res) => {
  const {
    query: { role },
    user,
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
    // return res.status(error?.status || 500).send({
    //   status: "FAILED",
    //   data: { error: error?.message || error },
    // });
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

//@desc
//@route
//@access
const addUser = async (req, res) => {
  const { body } = req;
  if (!body.fullname || !body.email || !body.password || !body.role) {
    res.status(400);
    throw new Error(
      "Alguns campos de dados obrigatorios sao vazios: fullname, email, password, roleI!"
    );
  }

  try {
    let savedUser = await addUserService(body);

    // custom jwt user id
    // const user = {
    //   id: savedUser._id,
    //   firstname: savedUser.fullname.split(" ")[0],
    //   role: savedUser.role,
    //   province: savedUser.address.province,
    //   district: savedUser.address.district,
    // };
    return res.status(201).send({
      status: "OK",
      data: {
        ...savedUser._doc,
        token: generateToken(savedUser._id),
      },
    });
  } catch (error) {
    // return res.status(error?.status || 500).send({
    //   status: "FAILED",
    //   data: { error: error?.message || error },
    // });
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

//@desc
//@route
//@access
const getUserById = async (req, res) => {
  // const userId = req.params.userId;
  const {
    params: { userId },
  } = req;
  if (!userId) {
    // res.status(400).send({
    //   status: "FAILED",
    //   data: { error: "O parametro ':userId' nao pode ser vazio" },
    // });
    res.status(400);
    throw new Error("O parametro ':userId' nao pode ser vazio");
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
    // res.status(error?.status || 500).json({
    //   status: "FAILED",
    //   data: { error: error?.message || error },
    // });
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

//@desc
//@route
//@access
const updateUser = async (req, res) => {
  const {
    body,
    params: { userId },
  } = req;

  if (!userId) {
    res.status(400);
    throw new Error("O parametro ':userId' nao pode ser vazio");
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
    // res.status(error?.status || 500).send({
    //   status: "FAILED",
    //   data: { error: error?.message || error },
    // });
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

//@desc
//@route
//@access
const deleteUser = async (req, res) => {
  const {
    params: { userId },
  } = req;

  if (!userId) {
    // res.status(400).send({
    //   status: "FAILED",
    //   data: { error: error?.error || error },
    // });
    res.status(400);
    throw new Error("O parametro ':userId' nao pode ser vazio");
  }

  try {
    let deletionResult = await deleteUserService(userId);
    res.status(204).send(deletionResult);
  } catch (err) {
    // return res.status(error?.error || 500).send({
    //   status: "FAILED",
    //   data: { error: error?.message || error },
    // });
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

export { login, addUser, getUserById, getUsers, updateUser, deleteUser };

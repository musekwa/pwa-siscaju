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
import asyncHandler from 'express-async-handler'



//@desc login
//@route
//@access
const login = asyncHandler (async (req, res) => {
  const { body } = req;

  if (!body.email || !body.password) {
    res.status(400);
    throw new Error("Deve especificar 'email' e 'password'!");
  }

  // try {
    let user = await loginService(body);

    const {
      fullname, address, email, role, _id, createdAt
    } = user

    return res.status(201).json({
        fullname, address, email, role, _id, createdAt,
        // ...user._doc,
        token: generateToken(user._id),
    });
  // } catch (error) {
  //   res.status(error?.status || 500);
  //   throw new Error(error.message);
  //   // next(error)
  // }
});


//@desc
//@route
//@access
const getMe = asyncHandler (async (req, res)=>{
  res.status(200).json(req.user);
})





//@desc
//@route
//@access
const getUsers = asyncHandler (async (req, res) => {
  const {
    query: { role },
    user,
  } = req;

  // try {
    let users;
    if (role) {
      users = await getUsersByRoleService(role);
    } else {
      users = await getUsersService();
    }

    if (!users) {
      res.status(404);
      throw new Error("Utilizadores nao encontrados");
    }
    
    return res.status(200).json({
      status: "OK",
      data: users,
    });
  // } catch (error) {
  //   res.status(error?.status || 500);
  //   throw new Error(error.message);
  // }
});

//@desc
//@route
//@access
const addUser = asyncHandler (async (req, res) => {
  const { body } = req;
  if (!body.fullname || !body.email || !body.password || !body.role) {
    res.status(400);
    throw new Error(
      "Alguns campos de dados obrigatorios sao vazios: fullname, email, password, roleI!"
    );
  }

  // try {
    let savedUser = await addUserService(body);

    const {
      fullname, address, email, role, _id, createdAt
    } = savedUser;

    return res.status(201).json({
        // ...savedUser._doc,
        fullname, address, email, role, _id, createdAt,
        token: generateToken(savedUser._id),
    });
  // } catch (error) {
  //   res.status(error?.status || 500);
  //   throw new Error(error.message);
  //   // next(error)
  // }
});

//@desc
//@route
//@access
const getUserById = asyncHandler (async (req, res) => {
  const {
    params: { userId },
  } = req;
  if (!userId) {
    res.status(400);
    throw new Error("O parametro ':userId' nao pode ser vazio");
  }
  // try {
    let foundUser = await getUserByIdService(userId);
    if (!foundUser) {
      res.status(404);
      throw new Error("Utilizador nao encontrado");
    }
    res.status(200).json({
      status: "OK",
      data: foundUser,
    });
  // } catch (error) {
  //   res.status(error?.status || 500);
  //   throw new Error(error.message);
  // }
});

//@desc
//@route
//@access
const updateUser = asyncHandler (async (req, res) => {
  const {
    body,
    params: { userId },
  } = req;

  if (!userId) {
    res.status(400);
    throw new Error("O parametro ':userId' nao pode ser vazio");
  }

  // try {
    let updatedUser = await updateUserService(userId, body);
    if (!updatedUser) {
      res.status(404);
      throw new Error("Utilizador nao encontrado");
    }
    res.status(200).json({
      status: "OK",
      data: updatedUser,
    });
  // } catch (error) {
  //   res.status(error?.status || 500);
  //   throw new Error(error.message);
  // }
});

//@desc
//@route
//@access
const deleteUser = asyncHandler (async (req, res) => {
  const {
    params: { userId },
  } = req;

  if (!userId) {
    res.status(400);
    throw new Error("O parametro ':userId' nao pode ser vazio");
  }

  // try {
    let deletionResult = await deleteUserService(userId);
    res.status(204).json({ status: "OK", message: "Utilizador eliminado", data: deletionResult });
  // } catch (err) {
  //   res.status(error?.status || 500);
  //   throw new Error(error.message);
  // }
});

export { login, addUser, getUserById, getUsers, updateUser, deleteUser };

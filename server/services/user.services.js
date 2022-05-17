import User from "../models/user.model.js";
import mongoose from "mongoose";


const ObjectId = mongoose.Types.ObjectId;

const loginService = async (body)=>{
  const { email, password } = body;

  try {
    let user = await User.authenticate(email, password)
    if (!user){
      return {
        status: "Ou utilizador nao existe ou password nao corresponde"
      }
    }
    return user
  } catch (error) {
    throw {
      status: 500, message: error?.message || error
    }
  }
}

const getUsersService = async () => {
  try {
    let users = await User.find({});
    if (!users) {
      return {
        status: 404,
        message: "Nenhum utilizador encontrado"
      }
    }
    return users;
  } catch (error) {
      throw {
          status: 500,
          message: error?.message || error
      }
  }
};

const getUsersByRoleService = async (role)=>{

  try {
    let users = await User.find({ role: role });
    console.log('users by role: ', users)
    if (!users) {
      return {
        status: 404,
        message: `Nenhum ${role} encontrado`,
      };
    }
    return users;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
}


const addUserService = async (user) => {
  const newUser = new User(user);  
  try {
        let savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw {
            status: 500,
            message: error?.message || error
        };
    }
};

const getUserByIdService = async (userId) => {
    
    try {
        let foundUser = await User.findById(ObjectId(userId));
        if (!foundUser) {
          return {
            status: 404,
            message: "Este utilizador nao existe",
          }
        }
        return foundUser;
    } catch (error) {
        throw {
            status: 500,
            message: error?.message || error
        };
    }
};

const updateUserService = async (userId, body) => {
    try {
        let updatedUser = await User.findOneAndUpdate(
          { _id: ObjectId(userId) },
          body,
          { runValidators: true, new: true }
        );
        if (!updatedUser){
          return {
            status: 404,
            message: "Este utilizador nao existe"
          }
        }
        return updatedUser;
    } catch (error) {
        throw {
            status: 500,
            message: error?.message || error
        }
    }
};

const deleteUserService = async (userId) => {
  try {
    let deletionResult = await User.deleteOne({ _id: ObjectId(userId) });
    return deletionResult;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};


export {
  loginService,
  addUserService,
  getUsersService,
  getUsersByRoleService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
};
import axios from "axios";

const API_URL = "/users/";
const LOGIN_URL = "/login/";

// register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

// login user
const updateRegister = async (userData) => {
  try {
    const response = await axios.post(LOGIN_URL, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error("O login falhou!");
  }
};

// login user
const login = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// logout user
const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;

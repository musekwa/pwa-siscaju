import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { reset, login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "../components/Spinner";
import { 
  Autocomplete, 
  Box, 
  Button, 
  FormControl, 
  Grid, 
  InputAdornment, 
  InputLabel, 
  OutlinedInput, 
  Paper, 
  Stack, 
  styled, 
  TextField, 
  Typography } from "@mui/material";
  import { LockOpen } from '@mui/icons-material';
  import { purple } from "@mui/material/colors";
  import { Link } from "react-router-dom"

const LoginBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,

})

const userRoles = [
  { label: "Extensionista", value: "Extensionista"},
  { label: "Gestor", value: "Gestor"},
  { label: "Produtor", value: "Produtor"},
]

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});


function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state)=>state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message, { autoClose: 10000, position: toast.POSITION.TOP_CENTER});
    }
   if (isSuccess && user){
        navigate('/')
        dispatch(reset())
   }
    else {
      dispatch(reset())
    }  

  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  // validating email
  const validateEmail = (email) =>{
   const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
   const result = pattern.test(email);
   if(result===false){
     // if the email is invalid
      return true;
   }
    // if the email is valid
    return false
  }
  

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (validateEmail(email) || !password){
      toast.error('Email e password inválidos', 
        { 
          autoClose: 5000, 
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
    }
    else {
      const userData = {
        email,
        password,
      }
      // dispatch(login(userData))

      toast.promise(
        dispatch(login(userData)),
        {
          pending: {
            render(){
              return "A entrar..."
            },
            icon: false,
          },
          success: {
            render({data}){
              return `Bem-vindo de volta, ${data.payload.fullname.split(" ")[0]}!`
            },
            // other options
            icon: "🟢",
          },
          error: {
            
            render({data}){
              return data?.message ?? "O login não ocorreu!" ;
            }
          }
        }
      )
    }
  };

  // if(isLoading) {
  //   return <Spinner />
  // }

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
    }} >
     
      <Paper sx={{ width: "400px", height: "80vh", textAlign: "center", pt: "20px" }}>
        <LockOpen fontSize="large" color="primary" />
      <Typography variant="h6" fontWeight={200} component="p" sx={{ p: "10px 0px 5px 0px"}}>Login</Typography>
      <Box component="form"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
       >
        <div style={{ padding: "30px 40px 15px 40px"}}>
            <TextField
              // error
              required
              fullWidth
              label="Email"
              id="fullWidth"
              name="email"
              type="email"
              placeholder="Email"
              size="small"
              focused
              onChange={onChange}
            />
          </div>
          <div style={{ padding: "15px 40px 20px 40px"}}>
            <TextField
              required
              fullWidth
              label="Password"
              id="fullWidth"
              name="password"
              type="password"
              placeholder="Password"
              size="small"
              onChange={onChange}
            />
          </div>
          <div style={{ padding: "15px 40px 20px 40px"}}>
            <BootstrapButton variant="contained" type="submit" >
              Entrar
            </BootstrapButton>
          </div>
          <div style={{ padding: "15px 40px 20px 40px"}}>
            <Stack direction={"row"} sx={{
              justifyContent: "space-between"
            }}>
              <Link to={"/forgotpassword"} style={{textDecoration:"none"}}>
                <Typography variant="body2" color={"primary"}>Recuperar password</Typography>
              </Link>
              <Link to={"/register"} style={{textDecoration:"none"}}>
                <Typography variant="body2" color={"primary"}>Criar nova conta</Typography>  
              </Link>
            </Stack>
          </div>
        </Box>
          
      </Paper>

    </Box>
  )
}



export default Login;

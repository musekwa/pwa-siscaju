import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from '../components/Spinner'

import { 
  Autocomplete, 
  Box, 
  Button, 
  FormControl, 
  Grid, 
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

const options = ["Extensionista", "Produtor", "Gestor"]


function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: ""
  });
  const [role, setRole] = useState("");
  const [inputValue, setInputValue] = useState('');
  const [countReload, setCountReload] = useState(0)

  const { fullname, email, password, password2 } = formData;

   const { user, isLoading, isError, isSuccess, message } = useSelector(
     (state) => state.auth
   );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toastId = useRef(null)

  useEffect(()=>{
    if (isError){
      toastId.current = toast.error(message, { autoClose: 10000, position: toast.POSITION.TOP_CENTER})
    }


    if (isSuccess && !user.address.hasOwnProperty('district')) {
      navigate('/register2')
      dispatch(reset())
      }
      else if (isSuccess) {
      navigate('/')
      dispatch(reset())
     }  
  }, [user, isError, isSuccess, message, navigate, dispatch ]);
 
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

    if (fullname.split(" ").length < 2){
      toast.error("Nome deve ser completo",  
      { 
        autoClose: 5000, 
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      } )
       return ;
    }
    if (validateEmail(email)){
      toast.error('Email inválido', 
      { 
        autoClose: 5000, 
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      } )
       return ;
    }
    if (password !== password2) {
      toast.error('Password não corresponde', 
      { 
        autoClose: 5000, 
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      } )
       return ;
    }
    if (!role || (role !== "Extensionista" && role !== "Produtor" && role !== "Gestor" )) {
      toast.error("Perfil inválido",  
      { 
        autoClose: 5000, 
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      } )
      return ;
    }
    
      const userData = {
        fullname,
        email,
        password,
        role
      };
      toast.promise(
        dispatch(register(userData)),
        {
          pending: {
            render(){
              return "Registando..."
            },
            icon: false,
          },
          success: {
            render({data}){
              return `Olá ${data.payload.fullname.split(" ")[0]}!`
            },
            // other options
            icon: "🟢",
          },
          error: {
            
            render({data}){
              return data?.message ?? "O registo não ocorreu!" ;
            }
          }
        }
      )
  };

  // if (isLoading){
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
     
      <Paper sx={{ width: "400px", textAlign: "center", pt: "20px" }}>
      <Typography variant="h6" fontWeight={200} component="p" sx={{ p: "10px 0px 5px 0px"}}>Registar-se</Typography>
      <Box component="form"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
       >
        <div style={{ padding: "30px 40px 15px 40px"}}>
          <TextField
            required
            fullWidth
            label="Nome completo"
            id="fullWidth fullname"
            name="fullname"
            type="text"
            placeholder="Nome completo"
            size="small"
            onChange={onChange}
            focused
          />
          </div>
          <div style={{ padding: "15px 40px 15px 40px"}}>
            <TextField
              required
              fullWidth
              label="Email"
              id="fullWidth email"
              name="email"
              type="email"
              placeholder="Email"
              size="small"
              onChange={onChange}
            />
          </div>
          <div style={{ padding: "15px 40px 15px 40px"}}>
            <TextField
              required
              fullWidth
              label="Password"
              id="fullWidth password"
              name="password"
              type="password"
              placeholder="Password"
              size="small"
              onChange={onChange}
            />
          </div>
          <div style={{ padding: "15px 40px 15px 40px"}}>
            <TextField
              required
              fullWidth
              label="Confirmar password"
              id="fullWidth password2"
              name="password2"
              type="password"
              placeholder="Password"
              size="small"
              onChange={onChange}
            />
          </div>
          <div style={{ padding: "15px 40px 15px 40px"}}>
          <Autocomplete
            fullWidth
            required
            size="small"
            disablePortal
            id="combo-box-demo"  
            value={role}
            options={options}
            onChange={(event, newRole) => {
                setRole(newRole);
              }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField name="role" {...params} label="Seleccionar um perfil"  />}          
          />
          </div>
          <div style={{ padding: "15px 40px 20px 40px"}}>
            <BootstrapButton variant="contained" type="submit">
              Register-se
            </BootstrapButton>
          </div>
        </Box>  
      </Paper>
    </Box>
  );
}

export default Register;

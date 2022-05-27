import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from '../components/Spinner'
import { districtsByProvince as districts } from "../app/districts";

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
  Typography, 
  Select, MenuItem, InputBase  } from "@mui/material";
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

// const districts = ["Extensionista", "Produtor", "Gestor"]


// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   'label + &': {
//     marginTop: theme.spacing(3),
//   },
//   '& .MuiInputBase-input': {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.background.paper,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     padding: '10px 26px 10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       borderRadius: 4,
//       borderColor: '#80bdff',
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     },
//   },
// }));
const sexes = ["F", "M"]

function Register3() {
//   const [formData, setFormData] = useState({
//     sex: "",
//     phone: "",
//   });

  const [sex, setSex] = useState("")
  const [phone, setPhone] = useState("")
  const [district, setDistrict] = useState("")
  const [province, setProvince] = useState("")
  const [inputValue, setInputValue] = useState('');
  const [countReload, setCountReload] = useState(0)


   const { user, isLoading, isError, isSuccess, message } = useSelector(
     (state) => state.auth
   );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if (isError){
      toast.error(message, { autoClose: 10000, position: toast.POSITION.TOP_CENTER})
    }
   if (isSuccess && countReload === 0){
        toast.success("Registado com sucesso!", { autoClose: 3000, position: toast.POSITION.TOP_RIGHT})
        setCountReload((countReload)=>countReload + 1)
        if (!user.address.hasOwnProperty('district')) {
        navigate('/dashboard')
        }
        else {
        navigate('/register2')
        }  
    }
    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch]);


 
//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

  const onSubmit = (e) => {
    e.preventDefault();
    // if (fullname.split(" ").length < 2){
    //   toast.error("Introduza o seu nome completo",  { autoClose: 5000, position: toast.POSITION.TOP_CENTER} )
    // }

 
    // else {
    //   const userData = {
    //     fullname,
    //     email,
    //     password,
    //     role
    //   };
    //   dispatch(register(userData));
    // }
  };

  if (isLoading){
    return <Spinner />
  }


 
  return (
  <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
    }} >
     
      <Paper sx={{ width: "400px", textAlign: "center", pt: "20px" }}>
        {/* <LockOpen fontSize="large" color="primary" /> */}
      <Typography variant="h6" fontWeight={200} component="p" sx={{ p: "10px 0px 5px 0px"}}>Registar-se</Typography>
      <Box component="form"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
       >
        <div style={{ padding: "30px 40px 15px 40px"}}>

        <TextField
          id=""
          select
          label="Gênero"
          value={sex}
          onChange={(e)=>setSex(e.target.value)}
          size="small"
          sx={{ width: "100px"}}
          
        >
          {sexes.map((sex) => (
            <MenuItem key={sex} value={sex}>
              {sex}
            </MenuItem>
          ))}
        </TextField>

          <TextField
            label="Telefone"
            id=""
            name="phone"
            type="text"
            placeholder="Telefone"
            size="small"
            value={phone}
            onChange={(e)=>setPhone(e.target.value.trim())}
            sx={{ width: "200px"}}
          />
          </div>
          <div style={{ padding: "15px 40px 20px 40px"}}>
          <Autocomplete
            fullWidth
            required
            size="small"
            disablePortal
            id="combo-box-demo"  
            value={"distict"}
            options={districts}
            onChange={(event, newDistrict) => {
                setDistrict(newDistrict);
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



  export default Register3;
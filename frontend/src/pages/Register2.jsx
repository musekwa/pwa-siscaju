
import { Avatar, Box, Divider, Grid, Paper, Stack, styled, Typography } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import  { AddCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "5px",
    marginTop: "5px",
    backgroundColor: "primary",
    height: "50px",
})

const Register2 = () => {

    const { user, isLoading, isError, isSuccess, message } = useSelector((state)=>state.auth)
    const dispatch = useDispatch();

  return (
      <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
    }} >
        <Paper sx={{ width: "400px", height: "70vh", textAlign: "center", padding: "15px" }}>
        {/* <Typography sx={{ textAlign: "left", paddingBottom: "10px" }} variant="h6" >Dados Pessoais</Typography> */}
        <Link to={"/register3"}>
          {/* <Divider /> */}
          <UserBox>
            <Box sx={{ height: "50px" }}>          
              <Avatar sx={{ width: "50px", height: "50px",}} src={user?.image} />
              <AddCircle color='primary' fontSize='small' sx={{position: "relative", bottom: 15, left: 12}} />
            </Box>
            <Stack direction={"column"}>
              <Typography variant='body2' fontweight={500}>{user && user?.fullname}</Typography>
              <Typography variant='body2' fontweight={500}>({user && user?.role})</Typography>
            </Stack>
          </UserBox>
          <Divider />
         </Link>
         <Box>
           <Typography variant="body2" sx={{ textAlign: "left", marginTop: "5px", }}>
             <div>Olá {user && user?.fullname.split(" ")[0]},</div>
              Como {user?.role}, deves completar o registo para obter acesso às funcionalidades do seu perfil e da sua região geográfica!
           </Typography>
         </Box>
        <Link to={"/register3"}>
          <Stack direction={"column"} gap={1}  sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "60%",
            }} dir>
              <AddCircle color='primary' fontSize='large' />
              <Typography variant="body2">Completar o registo</Typography>
          </Stack>
        </Link>
        </Paper>
    </Box>
  )
}

export default Register2
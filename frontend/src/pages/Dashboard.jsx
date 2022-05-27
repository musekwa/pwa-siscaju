import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import GoalForm from '../components/GoalForm';


function Dashboard() {

  const navigate = useNavigate();
  const { user } = useSelector((state)=>state.auth);

  console.log('user:', user)

  useEffect(()=>{
    if (!user){
      navigate("/login")
    }
  }, [user, navigate])
  return (
    <>
      {/* <Typography>Dashboard</Typography>
      <Typography>Dashboard</Typography> */}
      <section className='heading'>
        <h1>Welcome { user && user.name }</h1>
        <p>Goal Dashboard</p>
      </section>
      <GoalForm />
    </>
  )
}

export default Dashboard
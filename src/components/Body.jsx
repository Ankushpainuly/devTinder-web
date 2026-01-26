import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const [loading,setLoading] = useState(true);

  const fetchUser = async()=>{
    try{
      const res = await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
      dispatch(addUser(res.data));
    }catch(err){
      //if user is not login redirect to login page
      
       return navigate("/login");
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    //if user is not login redirect to login page
    if(!user){

      fetchUser();
    }else{
      setLoading(false)
    }
  },[]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body

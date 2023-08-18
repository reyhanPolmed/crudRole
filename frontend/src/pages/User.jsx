import React,{useEffect} from 'react'
import Layout from './Layout.jsx'
import UserList from '../components/UserList.jsx'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/AuthSlice.js'

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError, user} = useSelector((state) => state.auth);

  useEffect(()=> {
    dispatch(getMe());
  },[dispatch]);

  useEffect(()=> {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  },[isError,user,navigate]);
  return (
    <Layout>
        <UserList/> 
    </Layout>
  )
}

export default User
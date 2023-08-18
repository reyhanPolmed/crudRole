import React,{useEffect} from 'react'
import Layout from './Layout.jsx'
import FormEditProduct from '../components/FormEditProduct.jsx'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/AuthSlice.js'

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state) => state.auth);

  useEffect(()=> {
    dispatch(getMe());
  },[dispatch]);

  useEffect(()=> {
    if (isError) {
      navigate("/");
    }
  },[isError,navigate]);
  return (
    <Layout>
        <FormEditProduct/>
    </Layout>
  )
}

export default EditProduct
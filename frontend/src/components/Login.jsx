import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginUser, reset} from '../features/AuthSlice.js'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(()=> {
        if(user || isSuccess) {
            navigate('/dashboard')
        }
        dispatch(reset())
    },[user, isSuccess, dispatch, navigate])

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({email,password}))
    } 
    
  return (
    <div><section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
            <columns className="columns is-centered">
                <column className="column is-4">
                    <form className='box' onSubmit={Auth}>
                    { isError && <p className='has-text-centered'>{message}</p>} 
                    <h1 className='title is-2'> Login</h1>
                        <div className='field'>
                            <label  className="label">Email</label>
                            <div className="control">
                                <input 
                                type="text" 
                                className='input' 
                                value={email} 
                                onChange={(e)=> setEmail(e.target.value)} 
                                placeholder='Email'/>
                            </div>
                        </div>
                        <div className='field'>
                            <label  className="label">Password</label>
                            <div className="control">
                                <input 
                                type="password" 
                                className='input'                                
                                value={password} 
                                onChange={(e)=> setPassword(e.target.value)} 
                                placeholder='*******'/>
                            </div>
                        </div>
                        <div className='field  mt-5'>
                            <button type='submit' className='button is-success is-fullwidth'>
                                {isLoading ? 'loading..' : 'Login'}
                                </button>
                        </div>
                    </form>
                </column>
            </columns>
        </div>
      </div>
    </section></div>
  )
}

export default Login
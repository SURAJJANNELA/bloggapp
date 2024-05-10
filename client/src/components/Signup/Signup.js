import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './Signup.css'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Signup() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let [err,setErr]=useState('')
  let navigate=useNavigate()

  async function handle(userObj){
    if(userObj.userType==="user"){
    //make http post request
    let res=await axios.post('http://localhost:4000/user-api/user',userObj)
    console.log(res)
    if(res.data.message==='User Created'){
      //navigate to login page
      navigate('/Signin')
    }
    else{
      setErr(res.data.message)
    }
  }
  if(userObj.userType==="author"){
    //make http post request
    let res=await axios.post('http://localhost:4000/author-api/author',userObj)
    console.log(res)
    if(res.data.message==='author Created')
    {
      // navigate to login page
      navigate('/Signin')
    }
    else{
      setErr(res.data.message)
    }
  }
  }

  function navtologin(){
    navigate('/Signin')
  }

  return (
    <div className='head p-5'>
      <div className='w-50 shadow p-3 bg-body-tertiary rounded mx-auto'>
      <h1 className='text-center'>Register</h1>

        {/*Display user signup error message */}
        {err.length!==0 && <p className='text-danger fs-3'>{err}</p>}

        <form className='m-5' onSubmit={handleSubmit(handle)}>
          <div className='d-flex justify-content-start m-3'>
          <label htmlFor='userType' className='pe-3 fw-semibold fs-5'>Register as:</label>
            <div className=''>
              <input type="radio" name="userType" id="user" value={'user'} {...register('userType',{required:true})} ></input>
              <label htmlFor='user' className='m-1'>User</label>
            </div>
            <div>
              <input type="radio" name="userType" id="author" value={'author'} {...register('userType',{required:true})}></input>
              <label htmlFor='author' className='m-1'>Author</label>
            </div>
            {errors.userType?.type==='required' && <p className='text-danger'>userType is required</p>}
          </div>
          <div className='m-3'>
            <label htmlFor='username' className='w-100 text-start'>Username:</label>
            <input type='text' name='username' id='username' className='w-100 rounded-3' {...register('username',{required:true})}></input>
            {errors.username?.type==='required' && <p className='text-danger'>username is required</p>}
          </div>
          <div className='m-3'>
            <label htmlFor='password' className='w-100 text-start'>Password:</label>
            <input type='password' name='password' id='password' className='w-100 rounded-3' {...register('password',{required:true,minLength:6})}></input>
            {errors.password?.type==='required' && <p className='text-danger'>password is required</p>}
            {errors.password?.type==='minLength' && <p className='text-danger'>Minlength should be 6</p>}

          </div>
          <div className='m-3'>
            <label htmlFor='email' className='w-100 text-start'>Email:</label>
            <input type='email' name='email' id='email' className='w-100 rounded-3' {...register('email',{required:true})}></input>
            {errors.email?.type==='required' && <p className='text-danger'>email is required</p>}
          </div>
          <div className='text-center'>
          <button type='submit' className='btn btn-outline-success'>Register</button>
          </div>
          <hr/>
          <p className='text-center'>If you have already registered? <a href='' onClick={navtologin}>Login</a> Here</p>
        </form>
      </div>
    </div>
  )
}

export default Signup;

import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import './Signin.css'
import {useDispatch,useSelector} from 'react-redux'
import {userAuthorLoginThunk} from '../../redux/slices/userauthorslice'
import { useNavigate } from 'react-router-dom'

function Signin() {
  let {register,handleSubmit,formState:{errors}}=useForm();
  let {loginUserStatus,currentUser}=useSelector(state=>state.userAuthorLoginReducer)
  let dispatch=useDispatch();
  let navigate=useNavigate();

  function handle(userObj){
    console.log(userObj)
    dispatch(userAuthorLoginThunk(userObj))
  }

  useEffect(()=>{
    if(loginUserStatus===true){
      if(currentUser.userType==='user'){
        navigate('/user/articles')
      }
      if(currentUser.userType==='author'){
        navigate('/author/article-by-author/:auth')
      }
    }
  },[loginUserStatus])

  function navtoregister(){
    navigate('/Signup')
  }

  return (
    <div className='top p-5'>
      <div className='w-50 shadow p-3 bg-body-tertiary rounded mx-auto'>
        <h1 className='text-center'>Login</h1>
        <form className='m-5' onSubmit={handleSubmit(handle)}>
        <div className='d-flex justify-content-start m-3'>
          <label htmlFor='userType' className='pe-3 fw-semibold fs-5'>Login as:</label>
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
          <div className='text-center'>
          <button type='submit' className='btn btn-outline-success'>Login</button>
          </div>
          <hr/>
          <p className='text-center'>If you have not registered? <a href='' onClick={navtoregister}>Register</a> Here</p>

        </form>
      </div>
    </div>
  )
}

export default Signin;

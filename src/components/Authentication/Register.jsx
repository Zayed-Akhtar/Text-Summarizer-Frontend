import React, { useRef, useState } from 'react'
import BaseForm from './Forms/BaseForm'
import { Link, useNavigate } from 'react-router-dom';
import ShinyButton from '../Buttons/ShinyButton';
import axios from 'axios';

export default function Register() {
  let firstNameRef = useRef('');
  let lasNameRef = useRef('');
  let passwordRef = useRef('');
  let repeatPasswordRef = useRef('');
  let emailRef = useRef('');
  const[error, setError] = useState('');
  const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
  const navigate = useNavigate();


  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      setError("Password doesn't match");
      return;
    }
    axios.post(`${serverEndpoint}/authentication/signup`,
      {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        firstName: firstNameRef.current?.value,
        lastName: lasNameRef.current?.value
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("login_token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/");
        }
      }).catch((err) => {        
        setError(err.response?.data?.message || "login failed please try again")
      })
  }
  return (
    <BaseForm formSubmitHandler={formSubmitHandler}>
      <div className="form-content">
        <label htmlFor="">First Name</label>
        <input type="text" ref={firstNameRef} name="firstname" id="firstname" placeholder="First Name.." required />
      </div>
      <div className="form-content">
        <label htmlFor="">Last Name</label>
        <input type="text" ref={lasNameRef} name="lastname" id="lastname" placeholder="Last Name.." required/>
      </div>
      <div className="form-content">
        <label htmlFor="">Email</label>
        <input type="email" ref={emailRef} name="email" id="email" placeholder="Enter your email" required/>
      </div>
      <div className="form-content">
        <label htmlFor="">Password</label>
        <input type="password" ref={passwordRef} id="password" name="password" placeholder="enter your password" required/>
      </div>
      <div className="form-content">
        <label htmlFor="">Repeat Password</label>
        <input type="password" ref={repeatPasswordRef} id="repeatpassword" name="repeatpassword" placeholder="re-enter your password" required/>
      </div>
      <span>Already have an account ? <Link to={"/authentication/login"}>Login</Link></span>
      {error && <span style={{color:'red', margin:'auto', display:'block'}}>{error}</span>}
      <ShinyButton text="Register" type="submit" width="80%" className='register-button' />
    </BaseForm>
  )
}

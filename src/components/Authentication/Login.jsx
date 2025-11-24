import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShinyButton from "../Buttons/ShinyButton";
import BaseForm from "./Forms/BaseForm";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  let fullNameRef = useRef('');
  let emailRef = useRef('');
  let passwordRef = useRef('');
  const [error, setError] = useState('');
  const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

  const formSubmitHandler = (e)=>{
    e.preventDefault();
    axios.post(`${serverEndpoint}/authentication/login`, {email:emailRef.current?.value, password:passwordRef.current?.value})
    .then((res)=>{
      if(res.data.success){
        localStorage.setItem("login_token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      }
    }).catch((err)=>{      
      setError(err.response?.data?.message || "login failed please try again")
    })
  }
  return (
    <BaseForm formSubmitHandler={formSubmitHandler}>
      <div className="form-content">
        <label htmlFor="">Email</label>
        <input type="email" ref={emailRef} name="email" id="email" placeholder="Enter your email" required />
      </div>
      <div className="form-content">
        <label htmlFor="">Password</label>
        <input type="password" ref={passwordRef} id="password" name="password" placeholder="enter your password" required/>
      </div>
      <span>Didn't have an account ? <Link to={"/authentication/register"}>Signup</Link></span>
      {error && <span style={{color:'red', margin:'auto', display:'block'}}>{error}</span>}
      <ShinyButton text="login" type="submit" width="80%" className='login-button' />
    </BaseForm>
  )
}

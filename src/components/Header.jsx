import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getSessionToken, getUserInfo, removeLoginToken, removeUserInfo } from '../helpers/userSessionTokens';
import WavingHand from './WavingHand';

export default function Header() {
  const [isLoggedIn, setIsloggedIn] = useState(getSessionToken());
  const userInfo = JSON.parse(getUserInfo());
  const logOutUser = ()=>{
    removeUserInfo();
    removeLoginToken();
    setIsloggedIn(false);
  }  
  return (
    <header className="p-3 text-bg-dark"> <div className="container"> <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"> <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"> <img src="/Re-Imagine.png" alt="Re-imagine Logo" width="70" height="70" /></a> <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"> <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li><li>{userInfo && <div className='display-name'> <span style={{fontWeight:'500', fontSize:'1.2rem'}}>Hi, {userInfo?.name.split(' ')[0]}</span> <WavingHand size={20}/></div>}</li></ul> <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search"> <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"/> </form> <div className="text-end">{isLoggedIn ? <button onClick={logOutUser} type='button' className="btn btn-outline-light me-2">Logout</button> : <div><Link to={"/authentication/login"} className="btn btn-outline-light me-2">Login</Link> <Link to={"/authentication/register"} className="btn btn-warning">Sign-up</Link></div> }</div> </div> </div> </header>
  )
}

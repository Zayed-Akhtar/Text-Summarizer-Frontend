import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <>
      <Header/>
      <div className='app-content'>
      <Sidebar/>
      <Outlet/>
      </div>
    </>
  )
}

export default App

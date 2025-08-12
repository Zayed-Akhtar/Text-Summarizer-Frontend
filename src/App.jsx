import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ImgGenerator from './components/ImageGenerator/ImgGenerator';


function App() {
  return (
    <>
      <Header/>
      <div className='app-content'>
      <Sidebar/>
      <ImgGenerator/>
      </div>
    </>
  )
}

export default App

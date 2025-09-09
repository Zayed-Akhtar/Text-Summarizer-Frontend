import React from 'react'
import { BsStars } from "react-icons/bs";
import { RiImageCircleAiFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
export default function Controls() {
  const navigate = useNavigate();
  const goToTextGenerator = ()=>{
    navigate("/text-generator");
  }
  const goToImageGenerator = ()=>{
    navigate("/image-generator");
  }
  return (
    <div className='home-controls'>
        <button type='button' className='control-button btn btn-primary' onClick={goToTextGenerator}><BsStars style={{fontSize:'1.5rem'}}/> chat model</button>
        <button type='button' className='control-button btn btn-success' onClick={goToImageGenerator}><RiImageCircleAiFill style={{fontSize:'1.5rem'}}/> Image Generator</button>
        <button type='button' className='control-button control-3'>Learn more</button>
    </div>
  )
}

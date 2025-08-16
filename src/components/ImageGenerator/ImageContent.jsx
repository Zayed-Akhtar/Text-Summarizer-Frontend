import React from 'react'
import { RiDownload2Line } from "react-icons/ri";

export default function ImageContent({imageUrl, error=null}) {  
    const downloadHandler = ()=>{
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'generated-content.png'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
  return (
          <div className='image-container' style={{height:'100%'}}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl ? (
        <div>
          <img className='generated-content' src={imageUrl} alt="Generated Visual"/>
          <div className='downloader'>Click the icon for downlaod <span onClick={downloadHandler}><RiDownload2Line /></span></div>
        </div>
      ):
        <span className='fallback-text'>Response will be generated here !!</span>
      }
      </div>
  )
}

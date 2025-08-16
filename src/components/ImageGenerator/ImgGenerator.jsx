import React, { useRef, useState } from 'react';
import axios from 'axios';
import DotGrid from '../../blocks/Backgrounds/DotGrid/DotGrid';
import { FaTelegramPlane } from "react-icons/fa";


export default function ImgGenerator() {
  const promptRef = useRef('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const prompt = promptRef.current.value.trim();
    if (!prompt) {
      setError("Please enter a prompt.");
      return;
    }
    setError('');
    setLoading(true);
    setImageUrl('');

    try {
      const response = await axios.post(`${serverEndpoint}/image-generator/gen-image`, { prompt });
      setImageUrl(response.data.image_url);
    } catch (err) {
      setError(`Failed to generate image. Please try again, ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{width:'100%', height:'100vh'}}>
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor:'black', zIndex:'-12' }}>
  <DotGrid
    dotSize={5}
    gap={15}
    baseColor="#271E37"
    activeColor="#5227FF"
    proximity={120}
    shockRadius={250}
    shockStrength={5}
    resistance={750}
    returnDuration={1.5}
  />
  </div>
    <div className='imageGenerator-form' style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <div className='image-container'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl ? (
        <div>
          <img className='generated-content' src={imageUrl} alt="Generated Visual"/>
        </div>
      ):
        <span className='fallback-text'>Response will be generated here !!</span>
      }
      </div>
      <form onSubmit={handleFormSubmit}>
        <input
          ref={promptRef}
          type="text"
          placeholder="Describe the image you want"
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button title='Generate response' type="submit" disabled={loading}>
          {loading ? 'Generating...' : <FaTelegramPlane />}
        </button>
      </form>
    </div>
    </div>
  );
}

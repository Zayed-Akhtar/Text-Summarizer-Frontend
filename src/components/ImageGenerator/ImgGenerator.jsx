import React, { useRef, useState } from 'react';
import axios from 'axios';

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
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <form onSubmit={handleFormSubmit}>
        <input
          ref={promptRef}
          type="text"
          placeholder="Describe the image you want"
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Submit'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <img src={imageUrl} alt="Generated Visual" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

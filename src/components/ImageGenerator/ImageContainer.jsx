import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageContent from './ImageContent';
import ContentPanel from '../ContentPanel';
import { FaRegImages } from "react-icons/fa";
import { getCurrentDate } from '../../helpers/dateFormater';
import NavigatorButton from '../Buttons/NavigatorButton';
import RecentImages from './RecentImages';

export default function ImageContainer() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [seeAllImages, setSeeAllImages] = useState(false);
  const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
  const [recentImagesError, setRecentImagesError] = useState('');
  

  useEffect(() => {    
    axios.get(`${serverEndpoint}/image-generator/get-images`)
      .then(res => setImages(res.data.items)
      )
      .catch(err => setRecentImagesError(`Error getting images, ${err}`));
  }, []);

  const handleFormSubmit = async (e, promptRef) => {
    e.preventDefault();
    const prompt = promptRef.current.value.trim();
    if (!prompt) {
      setError("Please enter a prompt.");
      return;
    }
    setError('');
    setLoading(true);
    setImageUrl('');
    promptRef.current.value='';

    try {
      const response = await axios.post(`${serverEndpoint}/image-generator/gen-image`, { prompt });      
      setImageUrl(response.data.image_url);
      setImages([...images, [response.data.image_url, now.toString()]])
    } catch (err) {
      setError(`Failed to generate image. Please try again, ${err}`);
    } finally {
      setLoading(false);
    }
  };
  return (
        !seeAllImages ?
            <ContentPanel formHandler={handleFormSubmit} loading={loading} height='65%' placeholder='Describe the image you want..'>
              <ImageContent imageUrl={imageUrl} error={error} createdDate={getCurrentDate()}/>
              <NavigatorButton clickHandler={()=>setSeeAllImages(true)}><FaRegImages style={{marginRight:'4px', fontSize:'1rem'}} />Recently Genrated</NavigatorButton>
            </ContentPanel>
            :
          <RecentImages images={images} navigatorHandler={()=>setSeeAllImages(false)} error={recentImagesError}/>
  )
}

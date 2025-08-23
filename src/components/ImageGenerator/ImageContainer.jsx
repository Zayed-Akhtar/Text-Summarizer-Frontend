import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageContent from './ImageContent';
import ContentPanel from '../ContentPanel';
import { FaRegImages } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { formatDate } from '../../helpers/dateFormater';

export default function ImageContainer() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [seeAllImages, setSeeAllImages] = useState(false);
  const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
  const now = new Date();
  const currentFormatedDate = formatDate(now.toString());
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
      console.log('here is the response from gen image', response);
      
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
              <ImageContent imageUrl={imageUrl} error={error} createdDate={currentFormatedDate}/>
               <button className='navigator-button btn btn-outline-primary' onClick={()=>setSeeAllImages(true)}><FaRegImages style={{marginRight:'4px', fontSize:'1rem'}} />Recently Genrated</button>
            </ContentPanel>
            :
            <ContentPanel width={600} height={'80%'} bottom={'90%'}>
                <div className='all-images' style={{height:'90%', overflowY:'scroll'}}>
                  {recentImagesError &&  <p style={{ color: 'red' }}>{recentImagesError}</p>}
                    {images.length ?
                        images.map((image_data, i) => <ImageContent key={i} imageUrl={image_data[0]} createdDate={formatDate(image_data[1])}></ImageContent>)
                        : <h2 style={{color:'grey'}}>Loading...</h2>
                    }
                </div>
               <button className='navigator-button btn btn-outline-primary' onClick={()=>setSeeAllImages(false)}><LuImagePlus style={{marginRight:'4px', fontSize:'1rem'}} />Generate image</button>
            </ContentPanel>
  )
}

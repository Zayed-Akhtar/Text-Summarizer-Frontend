import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageContent from './ImageContent';
import ContentPanel from '../ContentPanel';
import { FaRegImages } from "react-icons/fa";
import { getCurrentDate, rawCurrentDate } from '../../helpers/dateFormater';
import NavigatorButton from '../Buttons/NavigatorButton';
import RecentImages from './RecentImages';
import { getSessionToken, getUserInfo, removeLoginToken, removeUserInfo } from '../../helpers/userSessionTokens';
import { useNavigate } from 'react-router-dom';

export default function ImageContainer() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [seeAllImages, setSeeAllImages] = useState(false);
  const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
  const [recentImagesError, setRecentImagesError] = useState('');
  const userInfo = getUserInfo();
  const loginToken = getSessionToken();
  const navigate = useNavigate();

  const errorResposne = (err, errorSetter, errorMessage)=>{
     if(err.response?.status === 401 || err.response?.status === 403)
            {
                removeUserInfo();
                removeLoginToken();
                navigate('/authentication/login', { state: { from: '/image-generator' } });
            }
            else{
                errorSetter(errorMessage);
            }
  }
  useEffect(() => {    
    axios.get(`${serverEndpoint}/image-generator/get-images`, {params: {userInfo}, headers: {Authorization: `${loginToken}`}})
      .then(res =>{
        if(error.length > 0){
          setError('')
        }
        setImages(res.data.items);
      } 
      )
      .catch((err) => {
        errorResposne(err, setRecentImagesError, `Error getting images, ${err}`)
      });
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
      const response = await axios.post(`${serverEndpoint}/image-generator/gen-image`, { prompt, userInfo }, {headers: {Authorization: `${loginToken}`}});      
      setImageUrl(response.data.image_url);
      setImages([...images, [response.data.image_url, rawCurrentDate()]])
      if(error.length > 0){
        setError('');
      }
    } catch (err) {
      errorResposne(err, setError, `Error generating image: ${err}`)
    } finally {
      setLoading(false);
    }
  };
  return (
        !seeAllImages ?
            <ContentPanel formHandler={handleFormSubmit} loading={loading} height='100vh' width='50%' bottom='90%' placeholder='Describe the image you want..'>
              <ImageContent imageUrl={imageUrl} error={error} createdDate={getCurrentDate()}/>
              {getSessionToken() && <NavigatorButton clickHandler={()=>setSeeAllImages(true)}><FaRegImages style={{marginRight:'4px', fontSize:'1rem'}} />Recently Generated</NavigatorButton>}
            </ContentPanel>
            :
          <RecentImages images={images} navigatorHandler={()=>setSeeAllImages(false)} error={recentImagesError}/>
  )
}

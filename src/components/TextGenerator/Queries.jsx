import React, { useEffect, useState } from 'react'
import NavigatorButton from '../Buttons/NavigatorButton'
import ShinyButton from '../Buttons/ShinyButton'
import axios from 'axios'
import Toast from '../Toasts/Toast';
import { BiAddToQueue } from "react-icons/bi";
import SuccessButton from '../Buttons/SuccessButton';
import DropUpButton from '../Buttons/DropUpButton';
import { getSessionToken, getUserInfo, removeLoginToken, removeUserInfo } from '../../helpers/userSessionTokens';

export default function Queries({error, modelSetter, generatedResponseStack, navigatorHandler, initialStackId, querySaved, saveQuerySetter, queryStackSetter, newQueryHandler}) {
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
    const [errorMessage, setErrormessage] = useState('');
    //updates stack id when new queries set is saved to db and db return a stack id
    const [stackId, setStackId] = useState(initialStackId);
    const [showToast, setShowToast] = useState(false);
    const [errorToast, setErrorToast] = useState(false);    
    const userInfo = getUserInfo();
    const loginToken = getSessionToken();
    console.log('stack id from Queries', stackId);
    
    useEffect(()=>{
        setStackId(initialStackId)
    }, [initialStackId]);

    const handleshowToast = (toastFunc)=>{
        toastFunc(true);
        setTimeout(() => {
            toastFunc(false)
        }, 3000);
    }

    const handleModelSelection = (item)=>{        
        modelSetter(item);
    }


    const handleSaveQueries = ()=>{
        if(!generatedResponseStack.length){
            handleshowToast(setErrorToast);
            return
        }
        console.log('user details', userInfo);
        
        axios.post(`${serverEndpoint}/text-generator/save-quries`, {queries:generatedResponseStack, stackId, userInfo},
                    {headers: {Authorization: `${loginToken}`}})
        .then((res)=>{
            if(res.data.success){
                saveQuerySetter(true);
                setStackId(res.data.items._id);
                queryStackSetter((prevStack)=>{
                    if(!initialStackId.length){
                        return [...prevStack, res.data.items]
                    }else{                        
                       return prevStack.map((stack)=>stack._id === res.data.items._id ? res.data.items : stack);
                    }
                });
                handleshowToast(setShowToast);
            }else{
                console.log(res.data.message);
            }
        })
        .catch((err)=> {
            if(err.response?.status === 401 || err.response?.status === 403){
                removeUserInfo();
                removeLoginToken();
                navigate('/authentication/login', { state: { from: '/text-generator' } });
            }
            else{
            setErrormessage(err.message)}
            }
        )
    }

    const handleStartNewQuery = (e)=>{
        console.log('start new query clicked');
        // handleSaveQueries();
        newQueryHandler(e);
    }
  return (
    <>
        <div className='generated-text'>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {generatedResponseStack.length ?
                    generatedResponseStack.map(ele => <div className='response-section'>
                        <p style={{ fontWeight: '500', color: 'white' }}>{ele.question}</p>
                        <p style={{ color: 'white' }}>{ele.answer}</p>
                    </div>
                    )
                    :
                    (!error && <span className='fallback-text'>Response will be generated here !!</span>)
                }
        </div>
        <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'1%'}}>
            <div style={{display:'flex', width:'32%', justifyContent:'space-between'}}>
                {getSessionToken() && <NavigatorButton clickHandler={navigatorHandler}>Recent Queries</NavigatorButton>}
                <DropUpButton clickHandler={handleModelSelection} items={['sonar', 'sonar-pro', 'sonar-deep-research', 'sonar-reasoning', 'sonar-reasoning-pro']}/>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', width:`${querySaved ? 'auto': '17%'}`}}>
                <SuccessButton title='Add new Query' onClickHandler={(e)=>handleStartNewQuery(e)}><BiAddToQueue /></SuccessButton>
                <ShinyButton className={`save-queries ${querySaved? 'hide' : ''}`} text='Save' clickHandler={handleSaveQueries}/>
            </div>
        </div>
        <Toast message='saved successfully !!' show={showToast}/>
        <Toast message='no queries to save please add one !!' backgroundcolor='red' show={errorToast}/>
    </>

  )
}

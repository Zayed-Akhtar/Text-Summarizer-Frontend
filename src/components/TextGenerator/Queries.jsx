import React, { useEffect, useState } from 'react'
import NavigatorButton from '../Buttons/NavigatorButton'
import ShinyButton from '../Buttons/ShinyButton'
import axios from 'axios'
import Toast from '../Toasts/toast';
import { BiAddToQueue } from "react-icons/bi";
import SuccessButton from '../Buttons/SuccessButton';
import DropUpButton from '../Buttons/DropUpButton';

export default function Queries({error, modelSetter, generatedResponseStack, navigatorHandler, initialStackId, querySaved, saveQuerySetter, queryStackSetter, newQueryHandler}) {
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
    const [errorMessage, setErrormessage] = useState('');
    //updates stack id when new queries set is saved to db and db return a stack id
    const [stackId, setStackId] = useState(initialStackId);
    const [showToast, setShowToast] = useState(false)
    console.log('reloaded');
    
    
    useEffect(()=>{
        setStackId(initialStackId)
    }, [initialStackId]);

    const handleshowToast = ()=>{
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false)
        }, 3000);
    }

    const handleModelSelection = (item)=>{        
        modelSetter(item);
    }


    const handleSaveQueries = ()=>{
        axios.post(`${serverEndpoint}/text-generator/save-quries`, {queries:generatedResponseStack, stackId})
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
                handleshowToast();
            }else{
                console.log(res.data.message);
            }
        })
        .catch(err=> setErrormessage(err.message))
    }

    const handleStartNewQuery = (e)=>{
        handleSaveQueries();
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
                <NavigatorButton clickHandler={navigatorHandler}>Recent Queries</NavigatorButton>
                <DropUpButton clickHandler={handleModelSelection} items={['sonar', 'sonar-pro', 'sonar-deep-research', 'sonar-reasoning', 'sonar-reasoning-pro']}/>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', width:`${querySaved ? 'auto': '17%'}`}}>
                <SuccessButton title='Add new Query' onClickHandler={handleStartNewQuery}><BiAddToQueue /></SuccessButton>
                <ShinyButton className={`save-queries ${querySaved? 'hide' : ''}`} text='Save' clickHandler={handleSaveQueries}/>
            </div>
        </div>
        <Toast message='saved successfully !!' show={showToast}/>
    </>

  )
}

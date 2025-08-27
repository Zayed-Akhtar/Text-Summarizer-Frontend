import React, { useState } from 'react'
import NavigatorButton from '../Buttons/NavigatorButton'
import ShinyButton from '../Buttons/ShinyButton'
import axios from 'axios'

export default function Queries({error, generatedResponseStack, navigatorHandler, initialStackId}) {
    const serverEndpoint = import.meta.env.VITE_SERVER_ENDPOINT;
    const [errorMessage, setErrormessage] = useState('');
    const [saved, setSaved] = useState(true);
    //updates stack id when new queries set is saved to db and db return a stack id
    const [stackId, setStackId] = useState(initialStackId);
    
    const handleSaveQueries = ()=>{
        axios.post(`${serverEndpoint}/text-generator/save-quries`, {queries:generatedResponseStack, stackId})
        .then((res)=>{
            if(res.data.success){
                setSaved(true);
                setStackId(res.data.items._id);
            }else{
                console.log(res.data.message);
            }
        })
        .catch(err=> setErrormessage(err.message))
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
            <div style={{display: 'flex', justifyContent:'space-between'}}>
            <NavigatorButton clickHandler={navigatorHandler}>Recent Queries</NavigatorButton>
            <ShinyButton className={`save-queries ${saved ? '' : 'hide'}`} text='Save' clickHandler={()=>handleSaveQueries()}/>
            </div>
    </>

  )
}

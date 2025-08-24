import React from 'react'
import ShinyText from '../blocks/TextAnimations/ShinyText/ShinyText';

export default function ShinyButton({text='sample button', clickHandler}) {
    return(
    <button onClick={clickHandler} style={{backgroundColor:'transparent', border:'1px solid grey', borderRadius:'10px', width:'fit-content'}}>
        <ShinyText 
        text={`${text}`} 
        disabled={false} 
        speed={3} 
        className='custom-class' 
        />
    </button>
    )

}

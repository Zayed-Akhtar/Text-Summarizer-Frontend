import React from 'react'
import ShinyText from '../../blocks/TextAnimations/ShinyText/ShinyText';

export default function ShinyButton({text='sample button', clickHandler, width='fit-content', className}) {
    return(
    <button onClick={clickHandler} className={className} style={{backgroundColor:'transparent', border:'1px solid grey', borderRadius:'10px', width}}>
        <ShinyText 
        text={`${text}`} 
        speed={3} 
        className='custom-class' 
        />
    </button>
    )

}

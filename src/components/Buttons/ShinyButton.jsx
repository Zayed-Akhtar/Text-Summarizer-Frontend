import React from 'react'
import ShinyText from '../../blocks/TextAnimations/ShinyText/ShinyText';

export default function ShinyButton({text='sample button', clickHandler, width='fit-content', className, type='button'}) {
    return(
    <button type={type} onClick={clickHandler} className={`shiny-button ${className}`} style={{width, height:'auto'}}>
        <ShinyText 
        text={text} 
        speed={3} 
        className='custom-class' 
        />
    </button>
    )

}

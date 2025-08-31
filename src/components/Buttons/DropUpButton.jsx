import React, { useState } from 'react'
import ShinyButton from './ShinyButton'
import ShinyText from '../../blocks/TextAnimations/ShinyText/ShinyText'

export default function DropUpButton({text='Models', items, clickHandler}) {
      const [activeElement, setActiveElement] = useState(0);
      const onClickHandler = (item,index)=>{
        setActiveElement(index);
        clickHandler(item);
      }  
    return (
    <div className="btn-group">
    <button type="button" className="shiny-button navigator-button dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <ShinyText 
        text={text} 
        speed={3} 
        className='custom-class' 
        />
    </button>
    <ul className="dropdown-menu">
        {items.map((item, i)=><li key={i}><a className={`dropdown-item ${activeElement === i && 'active'}`} onClick={()=>onClickHandler(item, i)} href="#">{item}</a></li>)}
    </ul>
    </div>
    )
}

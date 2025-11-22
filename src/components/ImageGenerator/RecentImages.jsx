import React, { useEffect, useState } from 'react'
import ContentPanel from '../ContentPanel'
import NavigatorButton from '../Buttons/NavigatorButton'
import ImageContent from './ImageContent';
import { formatDate } from '../../helpers/dateFormater';
import { LuImagePlus } from "react-icons/lu";


export default function RecentImages({images, navigatorHandler, error=''}) {
  return (
        <ContentPanel width={600} height={'80%'} bottom={'90%'}>
            <div className='scrollable-container'>
                {error &&  <p style={{ color: 'red' }}>{error}</p>}
                {images.length ?
                    images.map((image_data, i) =>{
                        console.log('image data: ', image_data);        
                       return <ImageContent key={i} imageUrl={image_data[0]} createdDate={formatDate(image_data[1])}></ImageContent>
                    } )
                    : !error && <h2 style={{color:'grey'}}>Generate an Image..</h2>
                }
            </div>
            <NavigatorButton clickHandler={navigatorHandler}><LuImagePlus style={{marginRight:'4px', fontSize:'1rem'}} />Generate image</NavigatorButton>
        </ContentPanel>
  )
}

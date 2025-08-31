import React from 'react'
import NavigatorButton from '../Buttons/NavigatorButton'
import SpotlightCard from '../../blocks/Components/SpotlightCard/SpotlightCard';
import ContentPanel from '../ContentPanel'
import ShinyButton from '../Buttons/ShinyButton';
import { getCurrentDate } from '../../helpers/dateFormater';

export default function RecentQueries({navigatorHandler, continueQueryHandler, queryStack}) {        
    return (
        <ContentPanel width='60%' height='80%' bottom='85%'>
            <div className='scrollable-container'>
                {queryStack &&
                    queryStack.map((stack)=>{
                        return (
                            <SpotlightCard key={stack._id} className='spotlight-card'>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p className='elipse-text' style={{ color: 'rgb(163 163 163)', fontSize: '1.4rem', fontWeight: '500' }}>{stack.queries[0].question}</p>
                                    <span style={{ color: '#7a7272' }}>{getCurrentDate()}</span>
                                </div>
                                <p className='elipse-text' style={{ color: 'rgb(163 163 163)' }}>{stack.queries[0].answer}</p>
                                <ShinyButton text='continue' clickHandler={()=>{
                                    continueQueryHandler(stack);
                                    navigatorHandler
                                }}/>
                            </SpotlightCard>
                        )
                    })
                }
            </div>
            <NavigatorButton clickHandler={navigatorHandler}>Generate New Quries</NavigatorButton>
        </ContentPanel>
    )
}

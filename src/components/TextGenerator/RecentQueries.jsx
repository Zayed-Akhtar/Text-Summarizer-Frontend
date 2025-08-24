import React from 'react'
import NavigatorButton from '../NavigatorButton'
import SpotlightCard from '../../blocks/Components/SpotlightCard/SpotlightCard';
import ContentPanel from '../ContentPanel'
import ShinyButton from '../ShinyButton';
import { getCurrentDate } from '../../helpers/dateFormater';

export default function RecentQueries({NavigatorHandler}) {
    return (
        <ContentPanel width='60%' height='80%' bottom='85%'>
            <div className='scrollable-container'>
                <SpotlightCard className='spotlight-card'>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                    <p className='elipse-text' style={{ color: 'rgb(163 163 163)', fontSize: '1.4rem', fontWeight: '500' }}>this is the Question ? </p>
                    <span style={{color:'#7a7272'}}>{getCurrentDate()}</span>
                    </div>
                    <p className='elipse-text' style={{ color: 'rgb(163 163 163)' }}>description</p>
                    <ShinyButton text='continue' />
                </SpotlightCard>
                <SpotlightCard className='spotlight-card'>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                    <p className='elipse-text' style={{ color: 'rgb(163 163 163)', fontSize: '1.4rem', fontWeight: '500' }}>this is the Question ? </p>
                    <span style={{color:'#7a7272'}}>{getCurrentDate()}</span>
                    </div>                    <p className='elipse-text' style={{ color: 'rgb(163 163 163)' }}>description</p>
                    <ShinyButton text='continue' />
                </SpotlightCard>
            </div>
            <NavigatorButton clickHandler={NavigatorHandler}>Generate Quries</NavigatorButton>
        </ContentPanel>
    )
}

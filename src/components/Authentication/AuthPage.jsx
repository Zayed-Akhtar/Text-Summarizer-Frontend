import React from 'react'
import HyperSpeedContainer from '../HyperSpeedContainer'
import Login from './Login'
import { Outlet } from 'react-router-dom'

export default function AuthPage() {
  return (
    <HyperSpeedContainer>
      <div style={{display:'flex'}}>
        <img src="/Re-imagine-text-logo.png" className='icon-AuthPagePage'/>
        <Outlet/>
      </div>
    </HyperSpeedContainer>
  )
}

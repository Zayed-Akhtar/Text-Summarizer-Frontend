import React from 'react'
import DotGrid from '../blocks/Backgrounds/DotGrid/DotGrid'

export default function ParentComtainer({children}) {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
        <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: 'black', zIndex: '-12' }}>
            <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#271E37"
            activeColor="#5227FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
            />
        </div>
        {children}
    </div>
  )
}

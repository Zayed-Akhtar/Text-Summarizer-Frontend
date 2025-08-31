import React from 'react'
import ParentComtainer from '../ParentComtainer'
import TextContainer from './TextContainer'


export default function TxtGenerator() {
console.log('reloaded');

  return (
    <ParentComtainer>
      <TextContainer/>
    </ParentComtainer>
  )
}

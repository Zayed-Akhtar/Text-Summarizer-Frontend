import React from 'react'
import ParentComtainer from '../ParentComtainer'
import TextType from '../../blocks/TextAnimations/TextType/TextType'
import Controls from './Controls'

export default function Home() {
  return (
    <ParentComtainer>
        <TextType className='typing-text' cursorClassName='typing-cursor' text={["Welcome to Re-imagine", "your most trusted AI assistant", "Happy to help you!"]}/>
        <Controls/>
    </ParentComtainer>
  )
}

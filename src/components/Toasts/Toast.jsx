import React from 'react'

export default function Toast({show, message, backgroundcolor='green', textColor='white'}) {
  return (
    <div className={`toast-message ${!show && 'hide'}`} style={{backgroundColor:backgroundcolor, color:textColor}}>
      <span>{message}</span>
    </div>
  )
}

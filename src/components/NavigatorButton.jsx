import React from 'react'

export default function NavigatorButton({children, clickHandler}) {
  return (
    <button className='navigator-button btn btn-outline-primary' onClick={clickHandler}>{children}</button>
  )
}

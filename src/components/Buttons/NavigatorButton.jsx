import React from 'react'

export default function NavigatorButton({children, clickHandler, className, title}) {
  return (
    <button className={`navigator-button btn btn-outline-primary ${className}`} title={title} onClick={clickHandler}>{children}</button>
  )
}

import React from 'react'

export default function SuccessButton({children, onClickHandler, title}) {
  return (
    <button title={title} type="button" onClick={onClickHandler} class="btn btn-outline-success">{children}</button>
  )
}

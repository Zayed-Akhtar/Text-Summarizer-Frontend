import React, { useRef } from 'react'
import { FaTelegramPlane } from "react-icons/fa";


export default function ContentPanel({children, formHandler, loading}) {
    const promptRef = useRef('');
    
  return (
          <div className='contentPanel-container' style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
            {children}
            <form onSubmit={(e)=>formHandler(e, promptRef)}>
              <input
                ref={promptRef}
                type="text"
                placeholder="Describe the image you want"
                style={{ width: '100%', padding: 8, marginBottom: 10 }}
              />
              <button title='Generate response' type="submit" disabled={loading}>
                {loading ? 'Generating...' : <FaTelegramPlane />}
              </button>
            </form>
          </div>
  )
}

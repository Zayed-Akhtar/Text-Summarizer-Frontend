import React, { useRef } from 'react'
import { FaTelegramPlane } from "react-icons/fa";


export default function ContentPanel({ children, formHandler, loading = false, width=500, height='60%', bottom='80%', placeholder='Generate response' }) {
    const promptRef = useRef('');
    
    return (
        <div className='contentPanel-container' style={{ maxWidth: width, margin: 'auto', padding: 20, height:`${height}`, bottom: `${bottom}` }}>
            <div style={{display:'flex', flexDirection:'column', maxHeight:'93%'}}>
            {children}
            </div>
            {formHandler &&
                <form onSubmit={(e) => formHandler(e, promptRef)}>
                    <input
                        ref={promptRef}
                        type="text"
                        placeholder={`${placeholder}`}
                        style={{ width: '100%', padding: 8, marginBottom: 10, height:'85%' }}
                    />
                    <button title='Generate response' type="submit" disabled={loading}>
                        {loading ? 'Generating...' : <FaTelegramPlane />}
                    </button>
                </form>            
                }
        </div>
    )
}

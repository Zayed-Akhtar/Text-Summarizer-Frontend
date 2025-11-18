import React from 'react'

export default function BaseForm({children, formSubmitHandler}) {
    return (
        <div style={{ color: 'white', position: 'absolute', top: '5%', left: '50%', width: '40%' }}>
            <form className="base-form" onSubmit={formSubmitHandler}>
                {children}
            </form>
        </div>
    )
}

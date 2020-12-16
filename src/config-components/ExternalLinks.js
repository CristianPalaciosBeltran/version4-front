import React from 'react'

export const A = ({
    href='', 
    target='_blank', 
    className='',
    children
}) => {
    return (
        <a href={href} target={target} className={className}>{children} </a>
    )
}

export const AWhatsapp = ({phone, message,  target='_blank', children, className}) => {
    return(
        <A
            href={`https://api.whatsapp.com/send?phone=${phone}&text=${message}`}
            target={target}
            className={className}
        >
            {children}
        </A>
    )
}
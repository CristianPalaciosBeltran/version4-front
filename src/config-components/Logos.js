//imports de react.
import React from 'react'
import {Link} from 'react-router-dom'
import {SvgLogo} from '../img'

export const LogoNavbar = ({href = '/', className=''}) => {
    return (
        <h6 className={`font-weight-bold ${className}`}> <Link to='/' className="text-dark">Version 4</Link> </h6>
    )
}


export const Logo = ({href = '/', className=''}) => {
    return (
        <SvgLogo />
    )
}
import React from 'react'
import Cristian from './cristian.jpg';
import Jesus from './Jesus.jpg';
import ProductDefault from './product.jpg'
import Logo from './version-4-logo.svg'


const Img = ({src='', width='', alt='', className=''}) => {
    return (
        <img src={src} width={width} alt={alt} className={className}/>
    )
}

export const ImgCristian = ({className}) =>(
    <Img src={Cristian} alt='Cristian photo' className={className}/>
)

export const ImgJesus = ({className}) =>(
    <Img src={Jesus} alt='jesus photo' className={className}/>
)

export const SvgLogo = ({className}) =>(
    <Img src={Logo} width={150} alt='logo version 4' className={className}/>
)

export const ImgProduct = ({uri = '', className}) =>(
    <Img src={uri ? uri : ProductDefault} alt='default product' className={className}/>
)


    

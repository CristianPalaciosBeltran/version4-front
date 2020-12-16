import React from 'react'
import Cristian from './cristian.jpg';
import Diego from './diego.jpg';
import ProductDefault from './product.jpg'


const Img = ({src='', alt='', className=''}) => {
    return (
        <img src={src} alt={alt} className={className}/>
    )
}

export const ImgCristian = ({className}) =>(
    <Img src={Cristian} alt='Cristian photo' className={className}/>
)

export const ImgDiego = ({className}) =>(
    <Img src={Diego} alt='diego photo' className={className}/>
)

export const ImgProduct = ({uri = '', className}) =>(
    <Img src={uri ? uri : ProductDefault} alt='default product' className={className}/>
)


    

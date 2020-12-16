import React from 'react'
import { Spinner } from 'reactstrap';

export const Loader = ({color, activate}) => {
    const rColor = color ? color: 'primary';
    if(activate){
        return(
            <Spinner color={rColor} className="align-middle ml-1" />
        )
    }
    return '';
}

export const Error = ({message}) => {
    
    return <>
        {message ? 
            <div className='text-danger text-center mb-4'>{message}</div>
        : ''}
    </>;
}

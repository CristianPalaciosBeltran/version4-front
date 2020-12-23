import React from 'react'

import {useSelector} from 'react-redux'

const ListOfResponsabilities = () => {
    const positionReducer = useSelector(state => state.positionReducer);
    const {data:{Description}} = positionReducer;
    let arrayDeCadenas = Description.split('-');
    arrayDeCadenas.splice(0, 1);
    return(
        <ul>
            {arrayDeCadenas.map(item => {
                return (
                        <li>{item}</li>
                    )
                }    
            )}
        </ul>
    )
}

export default ListOfResponsabilities;
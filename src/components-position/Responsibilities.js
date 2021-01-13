import React from 'react'
import {useSelector} from 'react-redux'
import {Lists} from '../config-components'

export const ListOfResponsabilities = () => {
    const positionReducer = useSelector(state => state.positionReducer);
    const {data:{Description}} = positionReducer;
    return(
        <Lists.ShowListFromText description={Description}/>
    )
}

export const ListOfDescriptions = () => {
    const positionReducer = useSelector(state => state.positionReducer);
    const {data:{Description2}} = positionReducer;
    return(
        <Lists.ShowListFromText description={Description2}/>
    )
}

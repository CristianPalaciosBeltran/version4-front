import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import * as adminActions from './reducer/adminActions'
import {ApiResponses} from '../components-api'
const ReadUser = ({title}) => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const adminReducer = useSelector(state => state.adminReducer)

    useEffect(() => {
        dispatch(adminActions.adminMethods({userId},'GetUserInfo'))
    }, [dispatch, userId])

    const {
        data:{
            UserName,
            Email,
            EmailConfirmed,
            PhoneNumber,
            PhoneNumberConfirmed
        },
        api_actions:{
            cargando,
            error
        }
    } = adminReducer

    if(cargando){
        return <>{cargando && <ApiResponses.Loader activate={true}/>}</>
    }

    return(
        <>
            <h5 className="font-weight-bold mb-3">{title}: {UserName}</h5>
            <div>Email:{Email} </div>
            <div>Correo confirmado:{EmailConfirmed ? 'Validado' : 'Sin validar'} </div>
            <div>Celular:{PhoneNumber ? PhoneNumber: 'No ha agregado número'} </div>
            <div>Celular confirmado:{PhoneNumberConfirmed ? 'Validado' : 'Sin validar'} </div>
            {error && <ApiResponses.Error message={error}/>}

        </>
    )
}

export default ReadUser;
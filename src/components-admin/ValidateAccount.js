import React, {useEffect} from 'react'
import {Button } from 'reactstrap'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import * as adminActions from './reducer/adminActions'
import {ApiResponses} from '../components-api'
const ValidateAccount = ({title}) => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const adminReducer = useSelector(state => state.adminReducer)

    // useEffect(() => {
    //     dispatch(adminActions.adminMethods({userId},'GetUserInfo'))
    // }, [dispatch, userId])

    const {
        data:{
            EmailConfirmed,
        },
        api_actions:{
            cargando,
            error, 
            cargandoValidateAccount
        }
    } = adminReducer

    if(cargando){
        return <></>
    }
    const action = () =>{
        dispatch(adminActions.adminMethods({Active: !EmailConfirmed, UserId: userId},'ValidateAccount'), 'cargandoValidateAccount')
    }

    return(
        <>
            <h5 className="font-weight-bold mb-3">Cuenta: {EmailConfirmed}</h5>
            <Button className={`btn btn-${EmailConfirmed ? 'success' : 'danger'}`} onClick={action}> 
                {EmailConfirmed ? 'Validada' : 'No Validada'} <ApiResponses.Loader activate={cargandoValidateAccount}/> 
            </Button>
            {error && <ApiResponses.Error message={error}/>}
        </>
    )
}

export default ValidateAccount;
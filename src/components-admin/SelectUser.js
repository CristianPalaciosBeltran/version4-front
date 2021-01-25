// Imports de react.
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
// Imports de config-components.
import {Inputs, RegularExpressions} from '../config-components'

// Imports de actions.
import * as adminActions from './reducer/adminActions'

import {Arrays} from '../utils'

const SelectUser = ({
    UserId,
    onChange,
    validations
}) => {
    const adminReducer = useSelector(state => state.adminReducer)
    const dispatch = useDispatch();
    useEffect(() => {    
        dispatch(adminActions.adminMethods({roleName: "User"},'GetUsersInfo'))
    }, [dispatch])
    
    const {
        list_users
    } = adminReducer;

    let fix_select = Arrays.fixSelect('Id','UserName',list_users)

    return(
        <>
            <Inputs.InputText 
                classLabel='font-weight-bold'
                textLabel='Usuario'
                isMandatory='*'
                classMandatory=''
                inputType='select'
                inputName={'UserId'}
                placeHolder={'Selecciona un usuario'}
                inputValue={UserId}
                onChange={onChange}
                RE={RegularExpressions.RE_EMPTY}
                validateRE={validations}
                optionPlaceHolder={'Selecciona un usuario'}
                options={fix_select}
            />
        </>
    )
}

export default SelectUser;


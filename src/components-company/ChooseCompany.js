// Imports de react.
import React, {useEffect} from 'react'
import { useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
// Imports de config-components.
import {DropDowns} from '../config-components'

// Imports de actions.
import * as companyActions from './reducer/companyActions'
import * as analyticsActions from '../components-analytics/reducer/analyticsActions'

const ChooseCompany = ({user, companyId }) => {
    const companyReducer = useSelector(state => state.companyReducer)
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {    
        dispatch(companyActions.companyMethods({companyId},'GetCompaniesByCompanyId'))
    }, [companyId, dispatch])
    
    const {
        list_companies
    } = companyReducer;

    const changeCompany = (id) => {
        debugger
        dispatch(companyActions.companyMethods({Id:id},'GetCompany'))
        dispatch(analyticsActions.analyticsMethods('count_positions', {companyId:id}))
        dispatch(analyticsActions.analyticsMethods('count_personal_details', {companyId:id}))
        dispatch(analyticsActions.analyticsMethods('count_areas', {companyId:id}))
        history.push(`${user}/${id}`);
    }

    let CompanyChoose = []
    if(list_companies.length > 0){
        CompanyChoose = list_companies.filter(item => item.Id === Number(companyId));
    }

    return(
        <>
           <DropDowns.DropDownActions
            color='primary'
            labelButton={
                <>{CompanyChoose.length>0 && CompanyChoose[0].TradeName}</>
            }
           >
               <DropDowns.Items 
                    items={list_companies}
                    action={changeCompany}
               />
           </DropDowns.DropDownActions>
           </>
    )
}

export default ChooseCompany;


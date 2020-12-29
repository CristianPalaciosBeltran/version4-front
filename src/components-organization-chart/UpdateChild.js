// Imports de react.
import React, {Component} from 'react'

// Imports de config-components.
import {InputText, Form1 } from '../config-components/Inputs'
import {RE_EMPTY } from '../config-components/RegularExpressions'

// Imports de actions.
import {connect } from 'react-redux'
import * as organizationChartActions from './reducer/organizationChartActions'
import * as positionActions from '../components-position/reducer/positionActions'
import * as personalDetailActions from '../components-personal-detail/reducer/personalDetailActions'


class OrganizationChart extends Component {
    
    componentDidMount = async() =>{
        const {
            nodeId, 
            organizationChartMethods, 
            personalDetailMethods,
            companyId, 
            positionMethods
        } = this.props;
        nodeId && await organizationChartMethods({Id: nodeId}, 'GetOrganizationChart');
        companyId && await positionMethods({companyId: companyId}, 'GetPositionsByCompanyId')
        companyId && await personalDetailMethods({companyId: companyId}, 'GetPersonalDetailsByCompanyId')
    }

    sendAction = async (action) => {
        const {
            organizationChartMethods, 
            organizationChartReducer: {data : {
                Id,
                DateCreated,
                PositionId,
                PositionChartId,
                CompanyId,
                PersonDetailId
            }},
            companyId
        } = this.props
        const model = {
            Id : Id ? Id : 0,
            DateCreated: DateCreated ? DateCreated : '0001-01-01T05:50:06.7199222-04:00',
            PositionId: PositionId ? PositionId : '',
            PersonDetailId: PersonDetailId ? PersonDetailId : '',
            PositionChartId: PositionChartId ? PositionChartId : '',
            CompanyId: CompanyId ? CompanyId : companyId,
        }
        await organizationChartMethods(model, action);
    }

    actionOrganizationChart = async () => {
        const {
            organizationChartCleanState,
            organizationChartReducer: {
                data : {
                    Id,
                }
            },
            reDirect,
            history,
            setModal
        } = this.props
        
        if(Id){
            await this.sendAction('PutOrganizationChart');
        }
        if(this.props.organizationChartReducer.data.Id){
            reDirect && history.push(`${reDirect}`)
            setModal && setModal();
            organizationChartCleanState()
        }
    }

    render(){
        const {
            organizationChartHandleValidation,
            organizationChartHandleChange,
            organizationChartReducer: {
                data : {
                    Id, 
                    PositionId,
                    PersonDetailId
                },
                api_actions: {cargando, error},
                validations,
            },
            positionReducer: {
                list_positions
            },
            personalDetailReducer: {
                list_personal_details
            }

        } = this.props;
        return(
            <>
            
            <Form1
                loading={ cargando }
                error={error}
                action={this.actionOrganizationChart}
                textButton={ 'Guardar Puesto' }
                textButtonLoading={'Guardando Puesto...' }
                validations={validations}
                handleValidations={organizationChartHandleValidation}
            >
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Selecciona un puesto'
                    isMandatory=''
                    classMandatory=''
                    inputType='select'
                    inputName={'PositionId'}
                    placeHolder={'Selecciona tipo de producto'}
                    inputValue={PositionId}
                    onChange={organizationChartHandleChange}
                    RE={RE_EMPTY}
                    validateRE={validations.PositionId}
                    optionPlaceHolder={'Selecciona un tipo de producto'}
                    options={list_positions}
                /> 
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Selecciona un puesto'
                    isMandatory=''
                    classMandatory=''
                    inputType='select'
                    inputName={'PersonDetailId'}
                    placeHolder={'Selecciona tipo de producto'}
                    inputValue={PersonDetailId}
                    onChange={organizationChartHandleChange}
                    RE={RE_EMPTY}
                    validateRE={validations.PersonDetailId}
                    optionPlaceHolder={'Selecciona un tipo de producto'}
                    options={list_personal_details}
                /> 
            </Form1>
            </>
        )
    }
}

const mapStateToProps = ({organizationChartReducer, positionReducer, personalDetailReducer}) => {
    return {organizationChartReducer, positionReducer, personalDetailReducer}
}

const mapDispatchToProps = {
    ...organizationChartActions,
    ...positionActions,
    ...personalDetailActions
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationChart);

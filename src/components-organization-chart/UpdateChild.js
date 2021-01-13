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
import * as areaActions from '../components-area/reducer/areaActions'


class OrganizationChart extends Component {
    
    componentDidMount = async() =>{
        const {
            nodeId, 
            organizationChartMethods, 
            personalDetailMethods,
            areaMethods,
            companyId, 
            positionMethods
        } = this.props;
        nodeId && await organizationChartMethods({Id: nodeId}, 'GetOrganizationChart');
        companyId && await positionMethods({companyId: companyId}, 'GetPositionsByCompanyId')
        companyId && await personalDetailMethods({companyId: companyId}, 'GetPersonalDetailsByCompanyId')
        companyId && await areaMethods({companyId: companyId, areaId: this.props.organizationChartReducer.data.AreasId}, 'GetAreasByCompanyIdWithoutTaken')
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
                PersonDetailId,
                AreasId
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
            AreasId: AreasId ? AreasId : ''
        }
        await organizationChartMethods(model, action);
    }

    actionOrganizationChart = async () => {
        const {
            areaMethods,
            organizationChartCleanState,
            organizationChartReducer: {
                data : {
                    Id,
                    AreasId
                }
            },
            reDirect,
            history,
            setModal
        } = this.props
        
        if(Id){
            // if(AreasId){
                await areaMethods({areaId: AreasId, organizationChartId: Id}, 'PutAreaTaken')
                //hago taken y hago untaken del area id del organization chart
            // }
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
                    PersonDetailId,
                    AreasId
                },
                api_actions: {cargando, error},
                validations,
            },
            positionReducer: {
                list_positions
            },
            personalDetailReducer: {
                list_personal_details
            },
            areaReducer: {
                list_areas
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
                    textLabel='Selecciona un Puesto'
                    isMandatory=''
                    classMandatory=''
                    inputType='select'
                    inputName={'PositionId'}
                    placeHolder={'Selecciona un Puesto'}
                    inputValue={PositionId}
                    onChange={organizationChartHandleChange}
                    RE={RE_EMPTY}
                    validateRE={validations.PositionId}
                    optionPlaceHolder={'Selecciona un Puesto'}
                    options={list_positions}
                /> 
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Selecciona un Empleado'
                    isMandatory=''
                    classMandatory=''
                    inputType='select'
                    inputName={'PersonDetailId'}
                    placeHolder={'Selecciona un Empleado'}
                    inputValue={PersonDetailId}
                    onChange={organizationChartHandleChange}
                    RE={RE_EMPTY}
                    validateRE={validations.PersonDetailId}
                    optionPlaceHolder={'Selecciona un Empleado'}
                    options={list_personal_details}
                /> 
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Selecciona un Area'
                    isMandatory=''
                    classMandatory=''
                    inputType='select'
                    inputName={'AreasId'}
                    placeHolder={'Selecciona una Area o Departamento'}
                    inputValue={AreasId}
                    onChange={organizationChartHandleChange}
                    RE={RE_EMPTY}
                    validateRE={validations.AreasId}
                    optionPlaceHolder={'Selecciona una Area o Departamento'}
                    options={list_areas}
                /> 
            </Form1>
            </>
        )
    }
}

const mapStateToProps = ({organizationChartReducer, positionReducer, personalDetailReducer, areaReducer}) => {
    return {organizationChartReducer, positionReducer, personalDetailReducer, areaReducer}
}

const mapDispatchToProps = {
    ...organizationChartActions,
    ...positionActions,
    ...personalDetailActions,
    ...areaActions
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationChart);

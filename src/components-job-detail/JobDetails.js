// Imports de react.
import React, {Component} from 'react'

// Imports de config-components.
import {InputText, Form1 } from '../config-components/Inputs'
import {RE_EMPTY } from '../config-components/RegularExpressions'

// Imports de actions.
import {connect } from 'react-redux'
import * as jobDetailActions from './reducer/jobDetailActions'

class JobDetail extends Component {
    
    componentDidMount = async() =>{
        const {personalDetailId, jobDetailMethods} = this.props;
        personalDetailId && await jobDetailMethods({personalDetailId}, 'GetJobDetailByPersonalDetailId');
    }

    sendAction = async (action) => {
        const {
            jobDetailMethods, 
            jobDetailReducer: {data : {
                Id,
                DateCreated,
                PersonDetailId,
                DateAdmission,
                Contract,
                Benefits,
                IntegratedSalary,
                DailySalary,
                Type
            }},
            personalDetailId
        } = this.props
        const model = {
            Id : Id ? Id : 0,
            DateCreated: DateCreated ? DateCreated : '0001-01-01T05:50:06.7199222-04:00',
            PersonDetailId: PersonDetailId ? PersonDetailId : personalDetailId,
            DateAdmission: DateAdmission ? DateAdmission : '',
            Contract: Contract ? Contract : '',
            Benefits: Benefits ? Benefits : '',
            IntegratedSalary: IntegratedSalary ? IntegratedSalary : '',
            DailySalary: DailySalary ? DailySalary : '',
            Type: Type ? Type : ''
        }
        await jobDetailMethods(model, action);
    }

    actionJobDetail = async () => {
        const {
            jobDetailCleanState,
            jobDetailReducer: {
                data : {
                    Id,
                }
            },
            reDirect,
            history,
            setModal
        } = this.props
        
        if(Id){
            await this.sendAction('PutJobDetail');
        }else{
            await this.sendAction('PostJobDetail')
        }
        if(this.props.jobDetailReducer.data.Id && reDirect){
            reDirect && history.push(`${reDirect}`)
            setModal && setModal();
            jobDetailCleanState()
        }
    }

    componentWillUnmount(){
        const { jobDetailCleanState } = this.props;
        jobDetailCleanState();    
    }

    render(){
        const {
            jobDetailHandleValidation,
            jobDetailHandleChange,
            jobDetailReducer: {
                data : {
                    Id,
                    DateAdmission,
                    Contract,
                    Benefits,
                    IntegratedSalary,
                    DailySalary,
                    Type
                },
                api_actions: {cargando, error},
                validations,
            },
        } = this.props;
        return(
            <>
            
            <Form1
                loading={ cargando }
                error={error}
                action={this.actionJobDetail}
                textButton={Id ? 'Guardar Información Laboral' : 'Crear Información Laboral'}
                textButtonLoading={Id ? 'Guardando Información Laboral...' : 'Creando Información Laboral...'}
                validations={validations}
                handleValidations={jobDetailHandleValidation}
            >
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Fecha de Ingreso'
                    isMandatory=''
                    classMandatory=''
                    inputType='date'
                    inputName={'DateAdmission'}
                    placeHolder={''}
                    inputValue={DateAdmission}
                    onChange={jobDetailHandleChange}
                    maxLength={25}
                    RE={RE_EMPTY}
                    validateRE={validations.DateAdmission}
                />
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Tipo de Contrato'
                    isMandatory=''
                    classMandatory=''
                    inputType='select'
                    inputName={'Contract'}
                    placeHolder={'Selecciona el tipo de Contrato'}
                    inputValue={Contract}
                    onChange={jobDetailHandleChange}
                    RE={RE_EMPTY}
                    validateRE={validations.Contract}
                    optionPlaceHolder={'Selecciona el tipo de Contrato'}
                    options={[
                        {Id:'Eventual',Name:'Eventual'},
                        {Id:'Planta',Name:'Planta'}
                    ]}
                />
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Prestaciones'
                    isMandatory=''
                    classMandatory=''
                    inputType='select'
                    inputName={'Benefits'}
                    placeHolder={'Selecciona el tipo de Prestaciones'}
                    inputValue={Benefits}
                    onChange={jobDetailHandleChange}
                    RE={RE_EMPTY}
                    validateRE={validations.Benefits}
                    optionPlaceHolder={'Selecciona el tipo de Prestaciones'}
                    options={[
                        {Id:'LFT',Name:'LFT'},
                        {Id:'CC',Name:'CC'}
                    ]}
                />
                
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Salario Integrado'
                    isMandatory=''
                    classMandatory=''
                    inputType='number'
                    inputName={'IntegratedSalary'}
                    placeHolder={'Introduce un salario'}
                    inputValue={IntegratedSalary}
                    onChange={jobDetailHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.IntegratedSalary}
                />
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Salario Diario'
                    isMandatory=''
                    classMandatory=''
                    inputType='number'
                    inputName={'DailySalary'}
                    placeHolder={'Introduce un salario'}
                    inputValue={DailySalary}
                    onChange={jobDetailHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.DailySalary}
                />
            </Form1>
            </>
        )
    }
}

const mapStateToProps = ({jobDetailReducer}) => {
    return {jobDetailReducer}
}

const mapDispatchToProps = {
    ...jobDetailActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);

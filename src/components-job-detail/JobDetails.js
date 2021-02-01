// Imports de react.
import React, {Component} from 'react'

// Imports de config-components.
import {InputText, Form1 } from '../config-components/Inputs'
import {RE_EMPTY } from '../config-components/RegularExpressions'

// Imports de actions.
import {connect } from 'react-redux'
import * as jobDetailActions from './reducer/jobDetailActions'
import * as areaActions from '../components-area/reducer/areaActions'

class JobDetail extends Component {
    
    componentDidMount = async() =>{
        const {personalDetailId, jobDetailMethods, areaMethods, companyId} = this.props;
        personalDetailId && await jobDetailMethods({personalDetailId}, 'GetJobDetailByPersonalDetailId');
        await areaMethods({companyId},'GetAreasByCompanyId')
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
                TotalSalary,
                MonthlySalary,
                BenefitsSalary,
                Contracts,
                Type,
                AreaId,
                CompanyId,
            }},
            personalDetailId,
            companyId
        } = this.props
        const model = {
            Id : Id ? Id : 0,
            DateCreated: DateCreated ? DateCreated : '0001-01-01T05:50:06.7199222-04:00',
            PersonDetailId: PersonDetailId ? PersonDetailId : personalDetailId,
            DateAdmission: DateAdmission ? DateAdmission : '',
            Contract: Contract ? Contract : '',
            Benefits: Benefits ? Benefits : '',
            BenefitsSalary: BenefitsSalary ? BenefitsSalary : '',
            Contracts: Contracts ? Contracts : '',
            TotalSalary: TotalSalary ? TotalSalary : '',
            MonthlySalary: MonthlySalary ? MonthlySalary : '',
            Type: Type ? Type : '',
            CompanyId: CompanyId ? CompanyId : companyId,
            AreaId: AreaId ? AreaId : '',
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
                    Benefits,
                    TotalSalary,
                    MonthlySalary,
                    AreaId,
                    BenefitsSalary,
                    Contracts
                },
                api_actions: {cargando, error},
                validations,
            },
            areaReducer : {
                list_areas
            }
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
                {/* <InputText 
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
                /> */}
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Salario Mensual'
                    isMandatory=''
                    classMandatory=''
                    inputType='number'
                    inputName={'MonthlySalary'}
                    placeHolder={'Introduce un salario'}
                    inputValue={MonthlySalary}
                    onChange={jobDetailHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.MonthlySalary}
                />
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Salario con Prestaciones'
                    isMandatory=''
                    classMandatory=''
                    inputType='number'
                    inputName={'BenefitsSalary'}
                    placeHolder={'Introduce un salario'}
                    inputValue={BenefitsSalary}
                    onChange={jobDetailHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.BenefitsSalary}
                />
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Salario Total'
                    isMandatory=''
                    classMandatory=''
                    inputType='number'
                    inputName={'TotalSalary'}
                    placeHolder={'Introduce un salario'}
                    inputValue={TotalSalary}
                    onChange={jobDetailHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.TotalSalary}
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
                    textLabel='Tipo de contrato'
                    isMandatory=''
                    classMandatory=''
                    inputType='select'
                    inputName={'Contracts'}
                    placeHolder={'Selecciona el tipo de Contrato'}
                    inputValue={Contracts}
                    onChange={jobDetailHandleChange}
                    RE={RE_EMPTY}
                    validateRE={validations.Contracts}
                    optionPlaceHolder={'Selecciona el tipo de Contrato'}
                    options={[
                        {Id:'Sindicalizado',Name:'Sindicalizado'},
                        {Id:'No Sindicalizado',Name:'No Sindicalizado'}
                    ]}
                />
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Selecciona un Area'
                    isMandatory=''
                    classMandatory=''
                    inputType='select'
                    inputName={'AreaId'}
                    placeHolder={'Selecciona una Area o Departamento'}
                    inputValue={AreaId}
                    onChange={jobDetailHandleChange}
                    RE={RE_EMPTY}
                    validateRE={validations.AreaId}
                    optionPlaceHolder={'Selecciona una Area o Departamento'}
                    options={list_areas}
                /> 
            </Form1>
            </>
        )
    }
}

const mapStateToProps = ({jobDetailReducer, areaReducer}) => {
    return {jobDetailReducer, areaReducer}
}

const mapDispatchToProps = {
    ...jobDetailActions,
    ...areaActions
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);

// Imports de react.
import React, {Component} from 'react'

// Imports de config-components.
import {InputText, Form1 } from '../config-components/Inputs'
import {RE_EMPTY } from '../config-components/RegularExpressions'

// Imports de actions.
import {connect } from 'react-redux'
import * as personalDetailActions from './reducer/personalDetailActions'

class PersonDetail extends Component {
    
    componentDidMount = async() =>{
        const {personalDetailId, personalDetailMethods} = this.props;
        personalDetailId && await personalDetailMethods({Id: personalDetailId}, 'GetPersonalDetail');
    }

    sendAction = async (action) => {
        const {
            personalDetailMethods, 
            personalDetailReducer: {data : {
                Id,
                DateCreated,
                Name,
                LastName,
                SecondLastName,
                CompanyId,
                RFC,
                Birthdate,
                Gender,
                Competencias,
                IMSS,
                CURP,
                Status,
            }},
            companyId
        } = this.props
        const model = {
            Id : Id ? Id : 0,
            DateCreated: DateCreated ? DateCreated : '0001-01-01T05:50:06.7199222-04:00',
            Name: Name ? Name : '',
            LastName: LastName ? LastName : '',
            CompanyId: CompanyId ? CompanyId : companyId,
            SecondLastName: SecondLastName ? SecondLastName : '',
            RFC: RFC ? RFC : '',
            Birthdate: Birthdate ? Birthdate : '',
            Gender: Gender ? Gender : '',
            Competencias: Competencias ? Competencias : '',
            IMSS: IMSS ? IMSS : '',
            CURP: CURP ? CURP : '',
            Status: Status ? Status : '',
        }
        await personalDetailMethods(model, action);
    }

    actionPersonalDetail = async () => {
        const {
            personalDetailCleanState,
            personalDetailReducer: {
                data : {
                    Id,
                }
            },
            reDirect,
            history,
            setModal
        } = this.props
        
        if(Id){
            await this.sendAction('PutPersonalDetail');
        }else{
            await this.sendAction('PostPersonalDetail')
        }
        if(this.props.personalDetailReducer.data.Id){
            debugger
            reDirect && history.push(`${reDirect}/${this.props.personalDetailReducer.data.Id}`)
            setModal && setModal();
            //personalDetailCleanState()
        }
    }

    componentWillUnmount(){
        const { personalDetailCleanState } = this.props;
        personalDetailCleanState();    
    }

    render(){
        const {
            personalDetailHandleValidation,
            personalDetailHandleChange,
            personalDetailReducer: {
                data : {
                    Id, 
                    Name,
                    LastName,
                    SecondLastName,
                    RFC,
                    Birthdate,
                    Gender,
                    Competencias,
                    IMSS,
                    CURP,
                    Status,
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
                action={this.actionPersonalDetail}
                textButton={Id ? 'Guardar Empleado' : 'Crear Empleado'}
                textButtonLoading={Id ? 'Guardando Empleado...' : 'Creando Empleado...'}
                validations={validations}
                handleValidations={personalDetailHandleValidation}
            >
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Nombre'
                    isMandatory='*'
                    classMandatory=''
                    inputType='text'
                    inputName={'Name'}
                    placeHolder={'Introduce un Nombre'}
                    inputValue={Name}
                    onChange={personalDetailHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.Name}
                />
                <InputText 
                     xs={6}
                     sm={6}
                     md={6}
                     lg={6}
                     xl={6}
                     classCol='pl-0 pr-1'
                    classLabel='font-weight-bold'
                    textLabel='Apellido Paterno'
                    isMandatory=''
                    classMandatory=''
                    inputType='text'
                    inputName={'LastName'}
                    placeHolder={'Introduce apellido paterno'}
                    inputValue={LastName}
                    onChange={personalDetailHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.LastName}
                />
                <InputText 
                    xs='6'
                    sm='6'
                    md='6'
                    lg='6'
                    xl='6'
                    classLabel='font-weight-bold'
                    textLabel='Apellido Materno'
                    isMandatory=''
                    classMandatory=''
                    inputType='text'
                    inputName={'SecondLastName'}
                    placeHolder={'Introduce apellido materno'}
                    inputValue={SecondLastName}
                    onChange={personalDetailHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.SecondLastName}
                />
                
                <InputText 
                     xs={8}
                     sm={8}
                     md={8}
                     lg={8}
                     xl={8}
                     classCol='pl-0 pr-1'
                    classLabel='font-weight-bold'
                    textLabel='Fecha de Nacimiento'
                    isMandatory=''
                    classMandatory=''
                    inputType='date'
                    inputName={'Birthdate'}
                    placeHolder={''}
                    inputValue={Birthdate}
                    onChange={personalDetailHandleChange}
                    maxLength={25}
                    RE={RE_EMPTY}
                    validateRE={validations.Birthdate}
                />
                <InputText 
                    xs={4}
                    sm={4}
                    md={4}
                    lg={4}
                    xl={4}
                    classLabel='font-weight-bold'
                    textLabel='Sexo'
                    isMandatory=''
                    classMandatory=''
                    inputType='select'
                    inputName={'Gender'}
                    placeHolder={'Selecciona el Sexo'}
                    inputValue={Gender}
                    onChange={personalDetailHandleChange}
                    RE={RE_EMPTY}
                    validateRE={validations.Gender}
                    optionPlaceHolder={' Sexo'}
                    options={[
                        {Id:'M',Name:'M'},
                        {Id:'F',Name:'F'}
                    ]}
                />
                <InputText 
                   
                    classLabel='font-weight-bold'
                    textLabel='Competencias'
                    isMandatory=''
                    classMandatory=''
                    inputType='textarea'
                    inputName={'Competencias'}
                    placeHolder={'Introduce un sueldo'}
                    inputValue={Competencias}
                    onChange={personalDetailHandleChange}
                   
                    RE={RE_EMPTY}
                    validateRE={validations.Competencias}
                />
                <InputText 
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={6}
                    classCol='pl-0 pr-1'
                    classLabel='font-weight-bold'
                    textLabel='RFC'
                    isMandatory=''
                    classMandatory=''
                    inputType='text'
                    inputName={'RFC'}
                    placeHolder={'Introduce un rfc'}
                    inputValue={RFC}
                    onChange={personalDetailHandleChange}
                    maxLength={25}
                    RE={RE_EMPTY}
                    validateRE={validations.RFC}
                />
                <InputText 
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={6}
                    classLabel='font-weight-bold'
                    textLabel='IMSS'
                    isMandatory=''
                    classMandatory=''
                    inputType='text'
                    inputName={'IMSS'}
                    placeHolder={'Introduce un numero'}
                    inputValue={IMSS}
                    onChange={personalDetailHandleChange}
                    maxLength={25}
                    RE={RE_EMPTY}
                    validateRE={validations.IMSS}
                />
                <InputText 
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={6}
                    classCol='pl-0 pr-1'
                    classLabel='font-weight-bold'
                    textLabel='CURP'
                    isMandatory=''
                    classMandatory=''
                    inputType='text'
                    inputName={'CURP'}
                    placeHolder={'Introduce una curp'}
                    inputValue={CURP}
                    onChange={personalDetailHandleChange}
                    maxLength={25}
                    RE={RE_EMPTY}
                    validateRE={validations.CURP}
                />
                <InputText 
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={6}
                    classLabel='font-weight-bold'
                    textLabel='Estatus'
                    isMandatory=''
                    classMandatory=''
                    inputType='select'
                    inputName={'Status'}
                    placeHolder={'Selecciona un Estatus'}
                    inputValue={Status}
                    onChange={personalDetailHandleChange}
                    maxLength={25}
                    RE={RE_EMPTY}
                    validateRE={validations.Status}
                    optionPlaceHolder={'Selecciona un Estatus'}
                    options={[
                        {Id:'Activo',Name:'Activo'},
                        {Id:'Inactivo',Name:'Inactivo'}
                    ]}
                />
            </Form1>
            </>
        )
    }
}

const mapStateToProps = ({personalDetailReducer}) => {
    return {personalDetailReducer}
}

const mapDispatchToProps = {
    ...personalDetailActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetail);

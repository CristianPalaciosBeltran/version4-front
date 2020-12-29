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
                Gender
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
            Gender: Gender ? Gender : ''
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
            reDirect && history.push(`${reDirect}`)
            setModal && setModal();
            personalDetailCleanState()
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
                    Gender
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
                    classLabel='font-weight-bold'
                    textLabel='RFC'
                    isMandatory=''
                    classMandatory=''
                    inputType='text'
                    inputName={'RFC'}
                    placeHolder={'Introduce un sueldo'}
                    inputValue={RFC}
                    onChange={personalDetailHandleChange}
                    maxLength={25}
                    RE={RE_EMPTY}
                    validateRE={validations.RFC}
                />
                <InputText 
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
                    classLabel='font-weight-bold'
                    textLabel='Genero'
                    isMandatory=''
                    classMandatory=''
                    inputType='text'
                    inputName={'Gender'}
                    placeHolder={''}
                    inputValue={Gender}
                    onChange={personalDetailHandleChange}
                    maxLength={25}
                    RE={RE_EMPTY}
                    validateRE={validations.Gender}
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

// Imports de react.
import React, {Component} from 'react'

// Imports de config-components.
import {InputText, Form1 } from '../config-components/Inputs'
import {RE_EMPTY } from '../config-components/RegularExpressions'

// Imports de actions.
import {connect } from 'react-redux'
import * as positionActions from './reducer/positionActions'

class Position extends Component {
    
    componentDidMount = async() =>{
        const {positionId, positionMethods} = this.props;
        positionId && await positionMethods({Id: positionId}, 'GetPosition');
    }

    sendAction = async (action) => {
        const {
            positionMethods, 
            positionReducer: {data : {
                Id,
                DateCreated,
                Name,
                Description,
                Description2,
                CompanyId,
                Objective,
                Knowledge,
                Salary
            }},
            companyId
        } = this.props
        const model = {
            Id : Id ? Id : 0,
            DateCreated: DateCreated ? DateCreated : '0001-01-01T05:50:06.7199222-04:00',
            Name: Name ? Name : '',
            Description: Description ? Description : '',
            Description2: Description2 ? Description2 : '',
            CompanyId: CompanyId ? CompanyId : companyId,
            Objective: Objective ? Objective : '',
            Knowledge: Knowledge ? Knowledge : '',
            Salary: Salary ? Salary : ''
        }
        await positionMethods(model, action);
    }

    actionPosition = async () => {
        const {
            positionCleanState,
            positionReducer: {
                data : {
                    Id,
                }
            },
            reDirect,
            history,
            setModal
        } = this.props
        
        if(Id){
            await this.sendAction('PutPosition');
        }else{
            await this.sendAction('PostPosition')
        }
        if(this.props.positionReducer.data.Id){
            reDirect && history.push(`${reDirect}`)
            setModal && setModal();
            positionCleanState()
        }
    }

    componentWillUnmount(){
        const {positionCleanState} = this.props;
        positionCleanState()

    }

    render(){
        const {
            positionHandleValidation,
            positionHandleChange,
            positionReducer: {
                data : {
                    Id, 
                    Name,
                    Description,
                    Description2,
                    Objective,
                    Salary
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
                action={this.actionPosition}
                textButton={Id ? 'Guardar Puesto' : 'Crear Puesto'}
                textButtonLoading={Id ? 'Guardando PUesto...' : 'Creando Puesto...'}
                validations={validations}
                handleValidations={positionHandleValidation}
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
                    onChange={positionHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.Name}
                />
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Objetivo'
                    isMandatory=''
                    classMandatory=''
                    inputType='textarea'
                    inputName={'Objective'}
                    placeHolder={'Introduce el objetivo del puesto'}
                    inputValue={Objective}
                    onChange={positionHandleChange}
                    maxLength={500}
                    RE={RE_EMPTY}
                    validateRE={validations.Objective}
                />
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Responsabilidades'
                    isMandatory=''
                    classMandatory=''
                    inputType='textarea'
                    inputName={'Description'}
                    placeHolder={'Introduce las responsabilidades del puesto'}
                    inputValue={Description}
                    onChange={positionHandleChange}
                    RE={RE_EMPTY}
                    validateRE={validations.Description}
                />
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Competencias'
                    isMandatory=''
                    classMandatory=''
                    inputType='textarea'
                    inputName={'Description2'}
                    placeHolder={'Introduce información'}
                    inputValue={Description2}
                    onChange={positionHandleChange}
                    RE={RE_EMPTY}
                    validateRE={validations.Description2}
                />
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Puntos'
                    isMandatory=''
                    classMandatory=''
                    inputType='number'
                    inputName={'Salary'}
                    placeHolder={'Introduce puntos'}
                    inputValue={Salary}
                    onChange={positionHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.Salary}
                />
            </Form1>
            </>
        )
    }
}

const mapStateToProps = ({positionReducer}) => {
    return {positionReducer}
}

const mapDispatchToProps = {
    ...positionActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Position);

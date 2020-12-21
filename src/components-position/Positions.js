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
                CompanyId,
            }},
            companyId
        } = this.props
        const model = {
            Id : Id ? Id : 0,
            DateCreated: DateCreated ? DateCreated : '0001-01-01T05:50:06.7199222-04:00',
            Name: Name ? Name : '',
            Description: Description ? Description : '',
            CompanyId: CompanyId ? CompanyId : companyId,
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

    render(){
        const {
            positionHandleValidation,
            positionHandleChange,
            positionReducer: {
                data : {
                    Id, 
                    Name,
                    Description, 
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
                    textLabel='Descripción'
                    isMandatory='*'
                    classMandatory=''
                    inputType='textarea'
                    inputName={'Description'}
                    placeHolder={'Introduce la descripción del puesto'}
                    inputValue={Description}
                    onChange={positionHandleChange}
                    maxLength={500}
                    RE={RE_EMPTY}
                    validateRE={validations.Description}
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

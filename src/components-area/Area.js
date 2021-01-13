// Imports de react.
import React, {Component} from 'react'

// Imports de config-components.
import {InputText, Form1 } from '../config-components/Inputs'
import {RE_EMPTY } from '../config-components/RegularExpressions'

// Imports de actions.
import {connect } from 'react-redux'
import * as areaActions from './reducer/areaActions'

class Area extends Component {
    
    componentDidMount = async() =>{
        const {areaId, areaMethods} = this.props;
        areaId && await areaMethods({Id: areaId}, 'GetArea');
    }

    sendAction = async (action) => {
        const {
            areaMethods, 
            areaReducer: {data : {
                Id,
                DateCreated,
                Name,
                CompanyId,
                Taken,
                Type,
            }},
            companyId
        } = this.props
        const model = {
            Id : Id ? Id : 0,
            DateCreated: DateCreated ? DateCreated : '0001-01-01T05:50:06.7199222-04:00',
            Name: Name ? Name : '',
            CompanyId: CompanyId ? CompanyId : companyId,
            Taken: Taken ? Taken : false,
            Type: Type ? Type : '',
        }
        await areaMethods(model, action);
    }

    actionProduct = async () => {
        const {
            areaReducer: {
                data : {
                    Id,
                }
            },
            reDirect,
            history,
            setModal
        } = this.props
        
        if(Id){
            await this.sendAction('PutArea');
        }else{
            await this.sendAction('PostArea')
        }
        if(this.props.areaReducer.data.Id){
            reDirect && history.push(`${reDirect}`)
            setModal && setModal();
        }
    }

    componentWillUnmount(){
        const { areaCleanState } = this.props;
        areaCleanState();    
    }

    render(){
        const {
            areaHandleValidation,
            areaHandleChange,
            areaReducer: {
                data : {
                    Id, 
                    Name,
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
                action={this.actionProduct}
                textButton={Id ? 'Guardar Area' : 'Crear Area'}
                textButtonLoading={Id ? 'Guardando Area...' : 'Crear Area...'}
                validations={validations}
                handleValidations={areaHandleValidation}
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
                    onChange={areaHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.Name}
                />
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Tipo'
                    isMandatory='*'
                    classMandatory=''
                    inputType='select'
                    inputName={'Type'}
                    placeHolder={'Selecciona el tipo de Area'}
                    inputValue={Type}
                    onChange={areaHandleChange}
                    RE={RE_EMPTY}
                    validateRE={validations.Type}
                    optionPlaceHolder={'Selecciona el tipo de Area'}
                    options={[
                        {Id:'Area',Name:'Area'},
                        {Id:'Departamento',Name:'Departamento'}
                    ]}
                />
            </Form1>
            </>
        )
    }
}

const mapStateToProps = ({areaReducer}) => {
    return {areaReducer}
}

const mapDispatchToProps = {
    ...areaActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Area);

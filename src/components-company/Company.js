// Imports de react.
import React, {Component} from 'react'

// Imports de config-components.
import {InputText, Form1 } from '../config-components/Inputs'
import {RE_EMPTY } from '../config-components/RegularExpressions'

// Imports de actions.
import {connect } from 'react-redux'
import * as companyActions from './reducer/companyActions'

class Company extends Component {
    
    componentDidMount = async() =>{
        const {companyId, companyMethods} = this.props;
        companyId && await companyMethods({Id: companyId}, 'GetCompany');
    }

    sendAction = async (action) => {
        const {
            companyMethods, 
            companyReducer: {data : {
                Id,
                DateCreated,
                TradeName,
                BusinessName, 
                BusinessActivity,
                UserId
            }},
            userId
        } = this.props
        const model = {
            Id : Id ? Id : 0,
            DateCreated: DateCreated ? DateCreated : '0001-01-01T05:50:06.7199222-04:00',
            TradeName: TradeName ? TradeName : '',
            BusinessName: BusinessName ? BusinessName : '',
            BusinessActivity: BusinessActivity ? BusinessActivity : 0,
            UserId: UserId ? UserId : userId
        }
        await companyMethods(model, action);
    }

    actionProduct = async () => {
        const {
            companyReducer: {
                data : {
                    Id,
                }
            },
            reDirect,
            history,
            setModal
        } = this.props
        
        if(Id){
            await this.sendAction('PutCompany');
        }else{
            await this.sendAction('PostCompany')
        }
        if(this.props.companyReducer.data.Id){
            reDirect && history.push(`${reDirect}/${this.props.companyReducer.data.Id}`)
            setModal && setModal();
        }
    }

    render(){
        const {
            companyHandleValidation,
            companyHandleChange,
            companyReducer: {
                data : {
                    Id, 
                    TradeName,
                    BusinessName,
                    BusinessActivity, 
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
                textButton={Id ? 'Guardar Empresa' : 'Crear Empresa'}
                textButtonLoading={Id ? 'Guardando Empresa...' : 'Crear Empresa...'}
                validations={validations}
                handleValidations={companyHandleValidation}
            >
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Nombre Comercial'
                    isMandatory='*'
                    classMandatory=''
                    inputType='text'
                    inputName={'TradeName'}
                    placeHolder={'Introduce un Nombre'}
                    inputValue={TradeName}
                    onChange={companyHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.TradeName}
                />
                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Razón social'
                    isMandatory='*'
                    classMandatory=''
                    inputType='textarea'
                    inputName={'BusinessName'}
                    placeHolder={'Introduce una Nombre'}
                    inputValue={BusinessName}
                    onChange={companyHandleChange}
                    maxLength={500}
                    RE={RE_EMPTY}
                    validateRE={validations.BusinessName}
                />

                <InputText 
                    classLabel='font-weight-bold'
                    textLabel='Actividad'
                    isMandatory='*'
                    classMandatory=''
                    inputType='text'
                    inputName={'BusinessActivity'}
                    placeHolder={'Introduce un Nombre'}
                    inputValue={BusinessActivity}
                    onChange={companyHandleChange}
                    maxLength={50}
                    RE={RE_EMPTY}
                    validateRE={validations.BusinessActivity} 
                />
            </Form1>
            </>
        )
    }
}

const mapStateToProps = ({companyReducer}) => {
    return {companyReducer}
}

const mapDispatchToProps = {
    ...companyActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Company);

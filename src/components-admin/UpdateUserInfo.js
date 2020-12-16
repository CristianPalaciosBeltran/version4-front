// Imports de librerias de react.
import React, { Component } from "react";

// Imports de config-components
import { Inputs, RegularExpressions } from '../config-components'

// Imports de actions.
import { connect } from "react-redux";
import * as adminActions from "./reducer/adminActions";

class UpdateContactInfo extends Component {
    async componentDidMount() {
        const { adminMethods, userId } = this.props;
        await adminMethods({userId},'GetUserInfo' ); 
    }
    action = async () => {
        const { 
            adminMethods, 
            userId, 
            adminReducer: {
                data:{ 
                    Email, 
                    PhoneNumber,
                    UserName,
                    TypeUser 
                }
            },
            closeModal
        } = this.props;

        const contactModel= {
            NewUserName: UserName,
            NewTypeUser: TypeUser,
            NewPhoneNumber: PhoneNumber,
            NewEmail: Email,
            UserId: userId
        }

        await adminMethods( contactModel,'PutContactInfo')
        
        const {
            adminReducer: {
            api_actions: { error },  
            },
        } = this.props;

        if(error){

        }else{
            closeModal && closeModal();
        }
        
    };

    async componentWillUnmount(){
        const { adminCleanState, adminMethods, userId } = this.props;
        adminCleanState();
        await adminMethods({userId},'GetUserInfo')
    }

    render() {
        const {
            adminHandleChange,
            adminHandleValidation,
            adminReducer: {
                data: { Email, PhoneNumber, UserName },
                validations,
                api_actions: { cargando, error },   
            }
        } = this.props;
        return (
            <>
                <Inputs.Form1
                     loading={cargando}
                     error={error}
                     action={this.action}
                     textButton={'Actualizar'}
                     textButtonLoading={'Actualizando ...'}
                     validations={validations}
                     handleValidations={adminHandleValidation}
                >
                    <Inputs.InputEmail 
                        classLabel='font-weight-bold'
                        textLabel='Email'
                        isMandatory='*'
                        classMandatory=''
                        inputType='email'
                        inputName={'Email'}
                        placeHolder={'Introduce un Email'}
                        inputValue={Email}
                        onChange={adminHandleChange}
                        maxLength={50}
                        RE={RegularExpressions.RE_EMPTY}
                        validateRE={validations.Email}
                    />
                    <Inputs.InputText 
                        classLabel='font-weight-bold'
                        textLabel='Nombre de usuario'
                        isMandatory='*'
                        classMandatory=''
                        inputType='text'
                        inputName={'UserName'}
                        placeHolder={'Introduce un nombre de usuario'}
                        inputValue={UserName}
                        onChange={adminHandleChange}
                        maxLength={50}
                        RE={RegularExpressions.RE_EMPTY}
                        validateRE={validations.UserName}
                    />
                    <Inputs.InputText 
                        classLabel='font-weight-bold'
                        textLabel='Celular'
                        isMandatory=''
                        classMandatory=''
                        inputType='text'
                        inputName={'PhoneNumber'}
                        placeHolder={'Introduce un Celular'}
                        inputValue={PhoneNumber}
                        onChange={adminHandleChange}
                        maxLength={50}
                        RE={RegularExpressions.RE_EMPTY}
                        validateRE={validations.PhoneNumber}
                    />
                    
                </Inputs.Form1>
            </>
        );
    }
}
const mapStateToProps = ({ adminReducer }) => {
  return { adminReducer };
};

const mapDispatchToProps = {
  ...adminActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactInfo);

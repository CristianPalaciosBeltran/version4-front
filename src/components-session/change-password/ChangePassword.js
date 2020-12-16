// Imports de librerias de react.
import React, { Component } from "react";
// Imports de config-components.
import {Inputs, RegularExpressions} from '../../config-components'
// Imports de actions.
import { connect } from "react-redux";
import * as changePasswordActions from "./reducer/changePasswordActions";

class ChangePassword extends Component {
  action = async () => {
    
    const {
      changePasswordMethods, 
      changePasswordReducer: { 
        data: {
          NewPassword,
          ConfirmNewPassword,
        }
      },
      code,
      email,
      history,
      reDirect
      } = this.props;

    const modelChangePassword = {
      phoneOrEmail: email,
      Code: code,
      NewPassword: NewPassword,
      ConfirmNewPassword: ConfirmNewPassword,
      usernameOrEmailOrPhoneNumber: email
    }
    await changePasswordMethods(modelChangePassword, 'change_password')
    history.push(reDirect)
  };

  render() {
    
    const {
      changePasswordHandleChange,
      changePasswordHandleValidation,
      changePasswordReducer: {
        data: { Code,
          NewPassword,
          ConfirmNewPassword },
        validations,
        api_actions: { cargando, error },
      },
      code
    } = this.props;
    RegularExpressions.RE_PASSWORD_MATCHES.re =  new RegExp( `^${NewPassword}$`);
  
    return (
        <>
            <Inputs.Form1
              loading={cargando}
              error={error}
              action={this.action}
              textButton={'Cambiar Contraseña'}
              textButtonLoading={'Cambiando contraseña...'}
              validations={validations}
              handleValidations={changePasswordHandleValidation}
            >
                <Inputs.InputText 
                    classLabel='font-weight-bold'
                    textLabel='Código'
                    isMandatory='*'
                    classMandatory=''
                    inputType='text'
                    inputName={'Name'}
                    placeHolder={'Introduce tu código'}
                    inputValue={code ? code : Code}
                    onChange={changePasswordHandleChange}
                    maxLength={50}
                    RE={RegularExpressions.RE_EMPTY}
                    validateRE={validations.Code}
                    readonly
                />
                <Inputs.InputPassword
                    inputValue={NewPassword}
                    onChange={changePasswordHandleChange}
                    validateRE={validations.NewPassword}
                    inputName={'NewPassword'}
                />
                <Inputs.InputPassword
                    inputValue={ConfirmNewPassword}
                    onChange={changePasswordHandleChange}
                    inputName={'ConfirmNewPassword'}
                    validateRE={validations.ConfirmNewPassword}
                    RE={RegularExpressions.RE_PASSWORD_MATCHES }  
                />
            </Inputs.Form1>
        </>
    );
  }
}
const mapStateToProps = ({ changePasswordReducer }) => {
  return { changePasswordReducer };
};

const mapDispatchToProps = {
  ...changePasswordActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

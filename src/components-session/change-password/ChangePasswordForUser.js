// Imports de librerias de react.
import React, { Component } from "react";
// Imports de config-components.
import {Inputs, RegularExpressions} from '../../config-components'
// Imports de actions.
import { connect } from "react-redux";
import * as changePasswordActions from "./reducer/changePasswordActions";

class ChangePasswordForUser extends Component {
  actionChangePasswordForUser = async () => {
    const { changePasswordMethods, userId, changePasswordReducer: {data:{ NewPassword,  ConfirmNewPassword}} } = this.props;
    await changePasswordMethods({NewPassword,  ConfirmPassword: ConfirmNewPassword, UserId: userId},'SetPassword');
  };

  render() {
    
    const {
      changePasswordHandleChange,
      changePasswordHandleValidation,
      changePasswordReducer: {
        data: {
            NewPassword,
            ConfirmNewPassword },
            validations,
        api_actions: { cargando, error },
      },
    } = this.props;
    RegularExpressions.RE_PASSWORD_MATCHES.re =  new RegExp( `^${NewPassword}$`);
  
    return (
        <>
            <Inputs.Form1
              loading={cargando}
              error={error}
              action={this.actionChangePasswordForUser}
              textButton={'Cambiar Contraseña'}
              textButtonLoading={'Cambiando contraseña...'}
              validations={validations}
              handleValidations={changePasswordHandleValidation}
            >
                <Inputs.InputPassword
                    inputValue={NewPassword}
                    onChange={changePasswordHandleChange}
                    validateRE={validations.NewPassword}
                    inputName={'NewPassword'}
                />
                <Inputs.InputPassword
                    textLabel = 'Repite la contraseña'
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForUser);

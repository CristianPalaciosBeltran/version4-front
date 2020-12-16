// Imports de librerias de react.
import React, { Component } from "react";

// Imports de config-components.
import {Inputs, RegularExpressions} from '../../config-components'

// Imports de actions.
import { connect } from "react-redux";
import * as changePasswordActions from "./reducer/changePasswordActions";

class SendEmail extends Component {
  action = async () => {
    const {changePasswordMethods,
        history,
        reDirect
      } = this.props;
     let email =  this.props.changePasswordReducer.data.phoneOrEmail;
    await changePasswordMethods({phoneOrEmail: email}, 'send_email_code')
    history.push(reDirect)
  };

  render() {
    
    const {
      changePasswordHandleChange,
      changePasswordHandleValidation,
      changePasswordReducer: {
        data: { phoneOrEmail },
        validations,
        api_actions: { cargando, error },
      },
    } = this.props;

    return (
      <>
        <Inputs.Form1
           loading={cargando}
           error={error}
           action={this.action}
           textButton={'Continuar'}
           textButtonLoading={'Enviando Email...'}
           validations={validations}
           handleValidations={changePasswordHandleValidation}
        >
          <Inputs.InputEmail  
            name='phoneOrEmail'
            inputValue={phoneOrEmail}
            onChange={changePasswordHandleChange} 
            label='Correo'
            RE={RegularExpressions.RE_EMAIL}
            validateRE={validations.phoneOrEmail}
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

export default connect(mapStateToProps, mapDispatchToProps)(SendEmail);

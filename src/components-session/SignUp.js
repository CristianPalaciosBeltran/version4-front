// Imports de librerias de react.
import React, { Component } from "react";

// Imports de config-components.
import {Inputs, RegularExpressions} from '../config-components';

// Imports de actions.
import { connect } from "react-redux";
import * as signUpActions from "./sign-up-reducer/signUpActions";

class SignUp extends Component {
  componentDidMount() {
    this.props.signUpReducer.data.Roles = this.props.role;
  }
  action = async () => {
    const {
      signUpMethods,
      signUpCleanState,
      signUpReducer: {
        data: {
          UserName,
          Email,
          PhoneNumber,
          Password,
          ConfirmPassword,
          ValidateByPhoneOrEmail,
          Roles,
          TypeUser
        },
      },
      reDirect,
      history,
      token
    } = this.props;

    const ModelSignUp = {
      UserName: UserName,
      Email: Email,
      PhoneNumber: PhoneNumber,
      Password: Password,
      ConfirmPassword: ConfirmPassword,
      ValidateByPhoneOrEmail: ValidateByPhoneOrEmail,
      Roles: Roles,
      TypeUser: TypeUser
    };

    await signUpMethods(ModelSignUp, token);
   
    if (this.props.signUpReducer.data.Id) {
        signUpCleanState();
        history.push(reDirect)     
    }
  };

  render() {
    const {
      signUpHandleChange,
      signUpHandleValidation,
      signUpReducer: {
        data: { UserName, Email, Password, ConfirmPassword },
        validations,
        api_actions: { cargando, error },
      }
    } = this.props;
    RegularExpressions.RE_PASSWORD_MATCHES.re =  new RegExp( `^${Password}$`)
    return (
       <>
            <Inputs.Form1
                loading={cargando}
                error={error}
                action={this.action}
                textButton={'Registrar'}
                textButtonLoading={'Registrando ...'}
                validations={validations}
                handleValidations={signUpHandleValidation}
            >
                <Inputs.InputEmail 
                    inputValue={Email}
                    onChange={signUpHandleChange} 
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
                    onChange={signUpHandleChange}
                    maxLength={50}
                    RE={RegularExpressions.RE_EMPTY}
                    validateRE={validations.UserName}
                />
                <Inputs.InputPassword
                    inputValue={Password}
                    onChange={signUpHandleChange}
                    validateRE={validations.Password}
                    inputName={'Password'}
                />
                <Inputs.InputPassword
                    inputValue={ConfirmPassword}
                    onChange={signUpHandleChange}
                    inputName={'ConfirmPassword'}
                    validateRE={validations.ConfirmPassword}
                    RE={RegularExpressions.RE_PASSWORD_MATCHES }  
                />
            </Inputs.Form1>
        </>
    );
  }
}

const mapStateToProps = ({ signUpReducer }) => {
  return { signUpReducer };
};

const mapDispatchToProps = {
  ...signUpActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

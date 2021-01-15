// Imports de librerias de react.
import React, { Component } from "react";

// Imports de config-components.
import { RE_EMPTY } from "../config-components/RegularExpressions";
import {InputEmail, InputPassword, Form1} from '../config-components/Inputs'

// Imports de actions.
import { connect } from "react-redux";
import * as loginActions from "./reducer-login/loginActions";
import * as companyActions from "../components-company/reducer/companyActions";
class LoginForm extends Component {
  ActionLogin = async () => {
    const {
      loginMethods,
      companyMethods,
      loginReducer: {
        data: { grant_type, username, password },
      },
    } = this.props;
    const ModelLogin = {
      grant_type: grant_type,
      username: username,
      password: password,
    };
    await loginMethods(ModelLogin);
    if (this.props.loginReducer.data.access_token) {
      if (localStorage.getItem("role") === "Admin") {
        window.open(`/admin-dashboard`, "_self");
      }
      if (localStorage.getItem("role") === "User") {
        await companyMethods('', 'GetCompaniesByUser')
        const { list_companies} = this.props.companyReducer;
        debugger
        window.open(`/user-dashboard/company/${list_companies[0].Id}`, "_self");
      }
      if (!localStorage.getItem("role")) {
        window.open(`/`, "_self");
      }
    }
  };

  handleRedirect = () => {
    const { history } = this.props;
    history.push("/sign-up");
  };

  render() {
    const {
      loginHandleValidation,
      loginHandleChange,
      loginReducer: {
        data: { username, password },
        validations,
        api_actions: { cargando, error },
      },
    } = this.props;
    return (
      <>
        <Form1
          loading={cargando}
          error={error}
          action={this.ActionLogin}
          textButton={'Iniciar Sesión'}
          textButtonLoading={'Iniciando sesión...'}
          validations={validations}
          handleValidations={loginHandleValidation}
        >
          <InputEmail  
            name='username'
            inputValue={username}
            onChange={loginHandleChange} 
            label='Nombre de usuario o correo'
            RE={RE_EMPTY}
            validateRE={validations.username}
          />
          <InputPassword
            inputValue={password}
            onChange={loginHandleChange}
            validateRE={validations.password}
            forgotPassword={true}
          />
        </Form1>
      </>
    );
  }
}
const mapStateToProps = ({ loginReducer, companyReducer }) => {
  return { loginReducer, companyReducer };
};

const mapDispatchToProps = {
  ...loginActions,
  ...companyActions
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

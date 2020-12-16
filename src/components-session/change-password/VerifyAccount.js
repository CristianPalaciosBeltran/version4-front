// // Imports de librerias de react.
// import React, { Component } from "react";

// // Imports de Reactstrap
// import { Col } from "reactstrap";
// // Imports de config-components
// import { LayoutSection } from "../../config-components/Layout";
// import { TitleH2 } from "../../config-components/Titles";

// import { FormLayout } from "../../config-components/Form2";
// import { InputN } from "../../config-components/Inputs";
// import {
//   RE_EMPTY,
//   RE_PASSWORD,
// } from "../../config-components/RegularExpresions";
// import { SmallWithLink } from "../../config-components/Paragraphs";

// // Imports de actions.
// import { connect } from "react-redux";
// import * as loginActions from "../login-reducer/loginActions";

// class VerifyAccount extends Component {
//   handleAction = async () => {
//     const {
//       loginUpMethods,
//       loginReducer: {
//         data: { grant_type, username, password },
//       },
//       reDirect,
//       history,
//     } = this.props;
//     const ModelLogin = {
//       grant_type: grant_type,
//       username: username,
//       password: password,
//     };
//     await loginUpMethods(ModelLogin);
//     if (reDirect && this.props.loginReducer.data.access_token) {
//       history.push(reDirect);
//       //redirecciono a la siguiente vista
//     }
//   };

//   handleRedirect = () => {
//     const { history, reDirect } = this.props;
//     history.push(reDirect);
//   };

//   render() {
//     const {
//       loginHandleChange,
//       loginHandleValidation,
//       loginReducer: {
//         data: { username, password },
//         validations,
//         api_actions: { cargando, error },
//       },
//     } = this.props;
//     return (
//       <LayoutSection>
//         <Col sm={{ size: 5, offset: 4 }}>
//           <TitleH2
//             titlePart1="Verifica"
//             titlePart2="Tu cuenta"
//             textInline="text-center"
//           />
//           {/* <FormLayout
//             titlePart1={"Recupera"}
//             titlePart2="Tu contraseña"
//             spaceTitle={true}
//             textInline={"text-center"}
//             handleAction={this.handleAction}
//             handleValidation={loginHandleValidation}
//             loading={cargando}
//             messageError={error}
//             labelButton="Iniciar sesión"
//           > */}
//           <InputN
//             isMandatory="*"
//             handleValueInput={loginHandleChange}
//             labelInput={"Código que se envio a tu correo"}
//             typeInput={"text"}
//             nameInput={"password"}
//             valueInput={password}
//             idInput={"2"}
//             placeholder={"Código"}
//             RE={RE_PASSWORD}
//             isInvalid={validations.password}
//             addonType="append"
//             addonLabel="verificar"
//             addonFunction={this.handleRedirect}
//             addonColor={"bg-dark"}
//           />
//           <SmallWithLink
//             textInline="text-center"
//             description="¿No has recibido el código?"
//             link="Volver a enviar."
//             href="/sign-up"
//           />
//         </Col>
//         <Col xs={12} sm={6}>
//           {/* <Image img={imageLogin} alt={"menu login"} /> */}
//         </Col>
//       </LayoutSection>
//     );
//   }
// }
// const mapStateToProps = ({ loginReducer }) => {
//   return { loginReducer };
// };

// const mapDispatchToProps = {
//   ...loginActions,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);

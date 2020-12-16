// // Imports de react.
// import React from 'react'
// import { useHistory } from "react-router";

// import {
//     Form,
//     Button
// } from 'reactstrap';



// // Imports de config-components
// import {useInputState, InputEmail, InputPassword} from '../config-components/Inputs'
// import {RE_EMPTY} from '../config-components/RegularExpressions'

// import {useDispatch, useSelector} from 'react-redux'
// import * as loginActions from './reducer-login/loginActions';

// export const Login = () => {

//     const loginState =  useSelector(state => state.loginReducer);
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const inputEmail = useInputState('');
//     const inputPassword = useInputState('');
   
//     const ActionLogin = async () => {
//         loginState.data.username = inputEmail.inputChange;
//         loginState.data.password = inputPassword.inputChange;
//         dispatch(await loginActions.loginMethods(loginState.data));
//         debugger
//         switch( localStorage.getItem("role")){
//             case 'admin':
//                 history.push('/admin-dashboard')
//                 break;
//             default:
//                 break;
//         }
//     }

//     return (
//         <>
//             <Form>
//                 <InputEmail  
//                     inputValue={inputEmail.inputChange}
//                     onChange={inputEmail.setOnChange} 
//                     label='Nombre de Usuario o Correo'
//                     RE={RE_EMPTY}
//                 />
//                 <InputPassword
//                     inputValue={inputPassword.inputChange}
//                     onChange={inputPassword.setOnChange} 
//                 />
//                 <p className="mb-4">¿Olvidaste tu contraseña?</p>
//                 <Button color="primary" className="w-100 mb-4" onClick={ActionLogin}>Iniciar sesión</Button>
//             </Form>
//         </>
//     );
// };



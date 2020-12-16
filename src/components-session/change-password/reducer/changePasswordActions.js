import {
    CHANGE_PASSWORD_CARGANDO,
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_HANDLE_CHANGE,
    CHANGE_PASSWORD_CLEAN_STATE,
    CHANGE_PASSWORD_USER,
    CHANGE_PASSWORD_HANDLE_VALIDATION,
    SetPassword
  } from "./changePasswordTypes";
  
  import {
    axios_api,
    errorHandler,
  } from "../../../components-api/ConfigApi";
   
  export const changePasswordHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: CHANGE_PASSWORD_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };
  
  export const changePasswordHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: CHANGE_PASSWORD_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const changePasswordCleanState = () => (dispatch) => {
    dispatch({
      type: CHANGE_PASSWORD_CLEAN_STATE,
    });
  };
  
  export const changePasswordMethods = (data, method) => async (dispatch) => {
    dispatch({
      type: CHANGE_PASSWORD_CARGANDO,
    });
    try {
      
      let answer;
      let type = CHANGE_PASSWORD_USER;
      switch(method){
        case 'send_email_code':
            let route = `api/Account/SendVerificationCode?phoneOrEmail=${data.phoneOrEmail}&usernameOrEmailOrPhoneNumber=${data.phoneOrEmail}`
            answer= await axios_api( route, false, "get");
            break;
        case 'change_password':
            answer= await axios_api( `/api/Account/ResetPassword`, false, "post", data);
            break;
        case 'SetPassword' :
            answer= await SetPassword(data)
            break;
        default:
            break;
      }
      
      dispatch({
        type: type,
        payload: answer.data,
      });
    } catch (error) {
      let messageError = errorHandler(error);
      dispatch({
        type: CHANGE_PASSWORD_ERROR,
        payload: messageError,
      });
    }
  };
  
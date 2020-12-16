import {
    ADMIN_CARGANDO,
    ADMIN_ERROR,
    ADMIN_HANDLE_CHANGE,
    ADMIN_CLEAN_STATE,
    ADMIN_HANDLE_VALIDATION,
    GetUserInfo,
    PutContactInfo,
    GetUsersInfo,
    ValidateAccount
  } from "./adminTypes";
  
  import { errorHandler } from "../../components-api/ConfigApi";
  
  export const adminHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: ADMIN_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };
  
  export const adminHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: ADMIN_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const adminCleanState = () => (dispatch) => {
    dispatch({
      type: ADMIN_CLEAN_STATE,
    });
  };
  
  export const adminMethods = (data, method, loading = 'cargando', typeError = 'error') => async (dispatch) => {
    dispatch({
      type: ADMIN_CARGANDO,
      payload: loading //? {cargando: loading} : {cargando: 'cargando'}
    });
    try {
      let answer;
     
      switch (method) {
        case "GetUserInfo":
            answer = await GetUserInfo(data);
            break;
        case "GetUsersInfo":
            answer = await GetUsersInfo(data);
            break;
        case "PutContactInfo":
            answer = await PutContactInfo(data)
            break;
        case "ValidateAccount":
            answer = await ValidateAccount(data);
            break;
        default:
            break;
      }
     
      dispatch({
        type: answer.type,
        payload: answer.res.data,
      });
    } catch (error) {    
      let messageError = errorHandler(error);
      let objectError = {
        messageError: messageError,
        typeError : typeError //? typeError : 'error'
      }
      dispatch({
        type: ADMIN_ERROR,
        payload: objectError,
      });
    }
  };
  
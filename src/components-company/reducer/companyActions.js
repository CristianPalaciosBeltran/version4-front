import {
    COMPANY_CARGANDO,
    COMPANY_ERROR,
    COMPANY_HANDLE_CHANGE,
    COMPANY_CLEAN_STATE,
    COMPANY_HANDLE_VALIDATION, 
    GetCompanies,
    GetCompany,
    PutCompany,
    PostCompany,
    DeleteCompany
  } from "./companyTypes";
  
  import { errorHandler } from "../../components-api/ConfigApi";
  
  export const companyHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: COMPANY_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };

  export const companyHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: COMPANY_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const companyCleanState = () => (dispatch) => {
    dispatch({
      type: COMPANY_CLEAN_STATE,
    });
  };
  
  export const companyMethods = (data, method) => async (dispatch) => {
    dispatch({
      type: COMPANY_CARGANDO,
    });
    try {
      let answer;
      switch (method) {
        case "GetCompanies":
          answer = await GetCompanies(); 
          break;

        case "GetCompany":
          answer = await GetCompany(data);
          break;

        case "PutCompany":
          answer = await PutCompany(data);
          break;

        case "PostCompany":
          answer = await PostCompany(data);
          break;
        
        case "DeleteCompany":
          answer = await DeleteCompany(data);
          break;

        default:
            break;
      }
  
      dispatch({
        type: answer.type,
        payload:  answer.res.data,
      });
    } catch (error) {
      let messageError = errorHandler(error);
      dispatch({
        type: COMPANY_ERROR,
        payload: messageError,
      });
    }
  };
  
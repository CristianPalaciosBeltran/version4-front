import {
    PERSONAL_DETAIL_CARGANDO,
    PERSONAL_DETAIL_ERROR,
    PERSONAL_DETAIL_HANDLE_CHANGE,
    PERSONAL_DETAIL_CLEAN_STATE,
    PERSONAL_DETAIL_HANDLE_VALIDATION, 
    GetPersonalDetails,
    GetPersonalDetailsByCompanyId,
    GetPersonalDetail,
    PutPersonalDetail,
    PostPersonalDetail,
    DeletePersonalDetail
  } from "./personalDetailTypes";
  
  import { errorHandler } from "../../components-api/ConfigApi";
  
  export const personalDetailHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: PERSONAL_DETAIL_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };

  export const personalDetailHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: PERSONAL_DETAIL_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const personalDetailCleanState = () => (dispatch) => {
    dispatch({
      type: PERSONAL_DETAIL_CLEAN_STATE,
    });
  };
  
  export const personalDetailMethods = (data, method) => async (dispatch) => {
    dispatch({
      type: PERSONAL_DETAIL_CARGANDO,
    });
    try {
      let answer;
      switch (method) {
        case "GetPersonalDetails":
          answer = await GetPersonalDetails(); 
          break;

        case "GetPersonalDetailsByCompanyId":
          answer = await GetPersonalDetailsByCompanyId(data);
          break;
        
          case "GetPersonalDetail":
          answer = await GetPersonalDetail(data);
          break;

        case "PutPersonalDetail":
          answer = await PutPersonalDetail(data);
          break;

        case "PostPersonalDetail":
          answer = await PostPersonalDetail(data);
          break;
        
        case "DeletePersonalDetail":
          answer = await DeletePersonalDetail(data);
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
        type: PERSONAL_DETAIL_ERROR,
        payload: messageError,
      });
    }
  };
  
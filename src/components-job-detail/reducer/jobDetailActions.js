import {
    JOB_DETAIL_CARGANDO,
    JOB_DETAIL_ERROR,
    JOB_DETAIL_HANDLE_CHANGE,
    JOB_DETAIL_CLEAN_STATE,
    JOB_DETAIL_HANDLE_VALIDATION, 
    GetJobDetails,
    GetJobDetailByPersonalDetailId,
    GetJobDetail,
    PutJobDetail,
    PostJobDetail,
    DeleteJobDetail
  } from "./jobDetailTypes";
  
  import { errorHandler } from "../../components-api/ConfigApi";
  
  export const jobDetailHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: JOB_DETAIL_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };

  export const jobDetailHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: JOB_DETAIL_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const jobDetailCleanState = () => (dispatch) => {
    dispatch({
      type: JOB_DETAIL_CLEAN_STATE,
    });
  };
  
  export const jobDetailMethods = (data, method) => async (dispatch) => {
    dispatch({
      type: JOB_DETAIL_CARGANDO,
    });
    try {
      let answer;
      switch (method) {
        case "GetJobDetails":
          answer = await GetJobDetails(); 
          break;

        case "GetJobDetailByPersonalDetailId":
          answer = await GetJobDetailByPersonalDetailId(data);
          break;
        
          case "GetJobDetail":
          answer = await GetJobDetail(data);
          break;

        case "PutJobDetail":
          answer = await PutJobDetail(data);
          break;

        case "PostJobDetail":
          answer = await PostJobDetail(data);
          break;
        
        case "DeleteJobDetail":
          answer = await DeleteJobDetail(data);
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
        type: JOB_DETAIL_ERROR,
        payload: messageError,
      });
    }
  };
  
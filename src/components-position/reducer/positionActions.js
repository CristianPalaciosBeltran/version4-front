import {
    POSITION_CARGANDO,
    POSITION_ERROR,
    POSITION_HANDLE_CHANGE,
    POSITION_CLEAN_STATE,
    POSITION_HANDLE_VALIDATION, 
    GetPositions,
    GetPositionsByCompanyId,
    GetPosition,
    PutPosition,
    PostPosition,
    DeletePosition
  } from "./positionTypes";
  
  import { errorHandler } from "../../components-api/ConfigApi";
  
  export const positionHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: POSITION_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };

  export const positionHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: POSITION_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const positionCleanState = () => (dispatch) => {
    dispatch({
      type: POSITION_CLEAN_STATE,
    });
  };
  
  export const positionMethods = (data, method) => async (dispatch) => {
    dispatch({
      type: POSITION_CARGANDO,
    });
    try {
      let answer;
      switch (method) {
        case "GetPositions":
          answer = await GetPositions(); 
          break;

        case "GetPositionsByCompanyId":
          answer = await GetPositionsByCompanyId(data);
          break;
        
          case "GetPosition":
          answer = await GetPosition(data);
          break;

        case "PutPosition":
          answer = await PutPosition(data);
          break;

        case "PostPosition":
          answer = await PostPosition(data);
          break;
        
        case "DeletePosition":
          answer = await DeletePosition(data);
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
        type: POSITION_ERROR,
        payload: messageError,
      });
    }
  };
  
import {
    AREA_CARGANDO,
    AREA_ERROR,
    AREA_HANDLE_CHANGE,
    AREA_CLEAN_STATE,
    AREA_HANDLE_VALIDATION, 
    GetAreas,
    GetAreasByCompanyId,
    GetAreasByCompanyIdWithoutTaken,
    GetAreasByCompanyIdTaken,
    GetArea,
    PutAreaTaken,
    PutArea,
    PostArea,
    DeleteArea
  } from "./areaTypes";
  
  import { errorHandler } from "../../components-api/ConfigApi";
  
  export const areaHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: AREA_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };

  export const areaHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: AREA_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const areaCleanState = () => (dispatch) => {
    dispatch({
      type: AREA_CLEAN_STATE,
    });
  };
  
  export const areaMethods = (data, method) => async (dispatch) => {
    dispatch({
      type: AREA_CARGANDO,
    });
    try {
      let answer;
      switch (method) {
        case "GetAreas":
          answer = await GetAreas(); 
          break;

        case "GetAreasByCompanyId":
          answer = await GetAreasByCompanyId(data);
          break;

        case "GetAreasByCompanyIdWithoutTaken":
          answer = await GetAreasByCompanyIdWithoutTaken(data);
          break;

        case "GetAreasByCompanyIdTaken":
          answer = await GetAreasByCompanyIdTaken(data);
          break;
        
        case "GetArea":
          answer = await GetArea(data);
          break;

        case "PutAreaTaken":
          answer = await PutAreaTaken(data);
          break;

        case "PutArea":
          answer = await PutArea(data);
          break;

        case "PostArea":
          answer = await PostArea(data);
          break;
        
        case "DeleteArea":
          answer = await DeleteArea(data);
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
        type: AREA_ERROR,
        payload: messageError,
      });
    }
  };
  
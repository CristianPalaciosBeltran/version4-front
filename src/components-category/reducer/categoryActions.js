import {
    CATEGORY_CARGANDO,
    CATEGORY_ERROR,
    CATEGORY_HANDLE_CHANGE,
    CATEGORY_CLEAN_STATE,
    CATEGORY_HANDLE_VALIDATION,
    GetCategories,
    GetCategory,
    PutCategory,
    PostCategory,
    DeleteCategory,
  } from "./categoryTypes";
  
  import { errorHandler } from "../../components-api/ConfigApi";
  
  export const categoryHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: CATEGORY_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };

  export const categoryHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: CATEGORY_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const categoryCleanState = () => (dispatch) => {
    dispatch({
      type: CATEGORY_CLEAN_STATE,
    });
  };
  
  export const categoryMethods = (data, method) => async (dispatch) => {
    dispatch({
      type: CATEGORY_CARGANDO,
    });
    try {
      let answer;
      switch (method) {
        case "GetCategories":
          answer = await GetCategories();
          break;

        case "GetCategory":
          answer = await GetCategory(data);
          break;

        case "PutCategory":
          answer = await PutCategory(data);
          break;

        case "PostCategory":
          answer = await PostCategory(data);
          break;
        
        case "DeleteCategory":
          answer = await DeleteCategory(data)
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
        type: CATEGORY_ERROR,
        payload: messageError,
      });
    }
  };
  
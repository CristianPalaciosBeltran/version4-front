import {
    PRODUCT_CARGANDO,
    PRODUCT_ERROR,
    PRODUCT_HANDLE_CHANGE,
    PRODUCT_CLEAN_STATE,
    PRODUCT_HANDLE_VALIDATION, 
    GetProducts,
    GetProductsByCategoryId,
    GetProduct,
    PutProduct,
    PostProduct,
    DeleteProduct
  } from "./productTypes";
  
  import { errorHandler } from "../../components-api/ConfigApi";
  

  export const productHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: PRODUCT_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };

  export const productHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: PRODUCT_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const productCleanState = () => (dispatch) => {
    dispatch({
      type: PRODUCT_CLEAN_STATE,
    });
  };
  
  export const productMethods = (data, method) => async (dispatch) => {
    dispatch({
      type: PRODUCT_CARGANDO,
    });
    try {
      let answer;
      switch (method) {
        case "GetProducts":
          answer = await GetProducts(); 
          break;

        case 'GetProductsByCategoryId':
          answer = await GetProductsByCategoryId(data); 
          break

        case "GetProduct":
          answer = await GetProduct(data);
          break;

        case "PutProduct":
          answer = await PutProduct(data);
          break;

        case "PostProduct":
          answer = await PostProduct(data);
          break;
        
        case "DeleteProduct":
          answer = await DeleteProduct(data);
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
        type: PRODUCT_ERROR,
        payload: messageError,
      });
    }
  };
  
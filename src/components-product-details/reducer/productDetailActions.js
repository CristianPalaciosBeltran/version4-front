import {
    PRODUCT_DETAIL_CARGANDO,
    PRODUCT_DETAIL_ERROR,
    PRODUCT_DETAIL_HANDLE_CHANGE,
    PRODUCT_DETAIL_CLEAN_STATE,
    PRODUCT_DETAIL_HANDLE_VALIDATION, 
    GetProductDetails,
    GetProductDetail,
    GetProductDetailByProductId,
    PutProductDetail,
    PostProductDetail,
    DeleteProductDetail,
  } from "./productDetailsTypes";
  
  import { errorHandler } from "../../components-api/ConfigApi";
  

  export const productDetailHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: PRODUCT_DETAIL_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };

  export const productDetailHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: PRODUCT_DETAIL_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const productDetailCleanState = () => (dispatch) => {
    dispatch({
      type: PRODUCT_DETAIL_CLEAN_STATE,
    });
  };
  
  export const productDetailMethods = (data, method) => async (dispatch) => {
    dispatch({
      type: PRODUCT_DETAIL_CARGANDO,
    });
    try {
      let answer;
      switch (method) {
        case "GetProductDetails":
          answer = await GetProductDetails(); 
          break;

        case "GetProductDetail":
          answer = await GetProductDetail(data);
          break;

        case "GetProductDetailByProductId":
          answer = await GetProductDetailByProductId(data);
          break;
        case "PutProductDetail":
          answer = await PutProductDetail(data);
          break;

        case "PostProductDetail":
          answer = await PostProductDetail(data);
          break;
        
        case "DeleteProductDetail":
          answer = await DeleteProductDetail(data);
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
        type: PRODUCT_DETAIL_ERROR,
        payload: messageError,
      });
    }
  };
  
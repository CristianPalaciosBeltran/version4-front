import {
    CATEGORY_PRODUCT_CARGANDO,
    CATEGORY_PRODUCT_ERROR,
    CATEGORY_PRODUCT_HANDLE_CHANGE,
    CATEGORY_PRODUCT_CLEAN_STATE,
    CATEGORY_PRODUCT_CRUD,
    CATEGORIES_PRODUCTS_LIST,
    CATEGORY_PRODUCT_HANDLE_VALIDATION
  } from "./categoryProductTypes";
  
  import { axios_api, errorHandler } from "../../components-api/ConfigApi";
  
  export const categoryProductHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: CATEGORY_PRODUCT_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };

  export const categoryProductHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: CATEGORY_PRODUCT_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const categoryProductCleanState = () => (dispatch) => {
    dispatch({
      type: CATEGORY_PRODUCT_CLEAN_STATE,
    });
  };
  
  export const categoryProductMethods = (data, method) => async (dispatch) => {
    dispatch({
      type: CATEGORY_PRODUCT_CARGANDO,
    });
    try {
      let answer;
      let type = CATEGORY_PRODUCT_CRUD;
      switch (method) {

        case "get_list_categories_products":
          answer = await axios_api(
            `api/ProductCategories`,
            true,
            "get"
          );
          type = CATEGORIES_PRODUCTS_LIST;
          break;

        case "get_category_product":
          answer = await axios_api(
            `api/ProductCategory?id=${
              data.Id 
            }`,
            true,
            "get"
          );
          break;
        
        case "put_category_product":
          answer = await axios_api(
            `api/ProductCategory?id=${data.Id}`,
            true,
            "put",
            data
          );
          if (answer.status === 204) {
            type = "put";
          }
          break;

        case "post_category_product":
          answer = await axios_api("api/ProductCategory", true, "post", data);
          break;
        
        case "delete_category_product":
          answer = await axios_api(
            `api/ProductCategory?id=${data.Id}`,
            true,
            "delete"
          );
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
        type: CATEGORY_PRODUCT_ERROR,
        payload: messageError,
      });
    }
  };
  
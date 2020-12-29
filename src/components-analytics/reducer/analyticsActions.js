import {
    ANALYTICS_CARGANDO,
    ANALYTICS_ERROR,
    ANALYTICS_CLEAN_STATE,
    ANALYTICS_COUNT_PRODUCTS,
    ANALYTICS_COUNT_COURSES,
    ANALYTICS_COUNT_USERS,
    ANALYTICS_COUNT_ADMINS,
    ANALYTICS_COUNT_COMPANIES,
    ANALYTICS_COUNT_POSITIONS,
    ANALYTICS_COUNT_PERSONAL_DETAILS
  } from "./analyticsTypes";
  
  import { axios_api, errorHandler } from "../../components-api/ConfigApi";
  
  export const analyticsCleanState = () => (dispatch) => {
    dispatch({
      type: ANALYTICS_CLEAN_STATE,
    });
  };
  
  export const analyticsMethods = (method, data='') => async (dispatch) => {
    dispatch({
      type: ANALYTICS_CARGANDO,
    });
    try {
      let answer;
      let type;
      switch (method) {
        case "count_products":
            answer = await axios_api(`api/CountProducts`, true, "get");
            type = ANALYTICS_COUNT_PRODUCTS;
            break;
        case "count_courses":
          answer = await axios_api(`api/CountProductsByCategoryId?id=${data.Id}`, true, "get");
          type = ANALYTICS_COUNT_COURSES;
          break;
        case "count_users":
          answer = await axios_api(`api/Account/UsersCount?roleName=User&isConfirmed=false`, true, "get");
          type = ANALYTICS_COUNT_USERS;
          break;
        case "count_admins":
          answer = await axios_api(`api/Account/UsersCount?roleName=Admin&isConfirmed=false`, true, "get");
          type = ANALYTICS_COUNT_ADMINS;
          break;
        case "count_companies":
          answer = await axios_api(`api/CountCompanies`, true, "get");
          type = ANALYTICS_COUNT_COMPANIES;
          break;
        case "count_positions":
          answer = await axios_api(`api/CountPositions?companyId=${data.companyId}`, true, "get");
          type = ANALYTICS_COUNT_POSITIONS;
          break;
        case "count_personal_details":
          answer = await axios_api(`api/CountPersonalDetails?companyId=${data.companyId}`, true, "get");
          type = ANALYTICS_COUNT_PERSONAL_DETAILS;
          break;
        default:
            break
  
          
      }
  
      dispatch({
        type: type,
        payload: answer.data,
      });
    } catch (error) {
      let messageError = errorHandler(error);
      dispatch({
        type: ANALYTICS_ERROR,
        payload: messageError,
      });
    }
  };
  
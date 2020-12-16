import {
    COURSE_CARGANDO,
    COURSE_ERROR,
    COURSE_HANDLE_CHANGE,
    COURSE_CLEAN_STATE,
    COURSE_CRUD,
    COURSES_LIST,
    COURSE_HANDLE_VALIDATION
  } from "./courseTypes";
  
  import { axios_api, errorHandler } from "../../components-api/ConfigApi";
  
  export const courseHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: COURSE_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };

  export const courseHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: COURSE_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const courseCleanState = () => (dispatch) => {
    dispatch({
      type: COURSE_CLEAN_STATE,
    });
  };
  
  export const courseMethods = (data, method) => async (dispatch) => {
    dispatch({
      type: COURSE_CARGANDO,
    });
    try {
      let answer;
      let type = COURSE_CRUD;
      switch (method) {
        case "get_list_courses":
          answer = await axios_api(
            `api/Courses`,
            true,
            "get"
          );
          type = COURSES_LIST;
          break;

        case "get_course":
          answer = await axios_api(
            `api/Course?id=${
              data.Id 
            }`,
            true,
            "get"
          );
          break;

        case "put_course":
          answer = await axios_api(
            `api/Course?id=${data.Id}`,
            true,
            "put",
            data
          );
          if (answer.status === 204) {
            type = "put";
          }
          break;

        case "post_course":
          answer = await axios_api("api/Course", true, "post", data);
          break;
        
        case "delete_course":
          answer = await axios_api(
            `api/Course?id=${data.Id}`,
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
        type: COURSE_ERROR,
        payload: messageError,
      });
    }
  };
  



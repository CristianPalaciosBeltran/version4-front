import {
    SECTION_CARGANDO,
    SECTION_ERROR,
    SECTION_HANDLE_CHANGE,
    SECTION_CLEAN_STATE,
    SECTION_CRUD,
    SECTIONS_LIST,
    SECTIONS_SELECT,
    SECTION_HANDLE_VALIDATION
  } from "./sectionTypes";
  
  import { axios_api, errorHandler } from "../../components-api/ConfigApi";
  
  export const sectionHandleChange = (e, isInvalid) => (dispatch) => {
    dispatch({
      type: SECTION_HANDLE_CHANGE,
      payload: { e: e, isInvalid: isInvalid },
    });
  };

  export const sectionHandleValidation = (validation) => (dispatch) => {
    dispatch({
      type: SECTION_HANDLE_VALIDATION,
      payload: validation,
    });
  };
  
  export const sectionCleanState = () => (dispatch) => {
    dispatch({
      type: SECTION_CLEAN_STATE,
    });
  };
  
  export const sectionMethods = (data, method) => async (dispatch) => {
    dispatch({
      type: SECTION_CARGANDO,
    });
    try {
      let answer;
      let type = SECTION_CRUD;
      switch (method) {
        case "get_list_sections_select":
          answer = await axios_api(
            `api/SectionsByCourseId?id=${data.Id}`,
            true,
            "get"
          );
          type = SECTIONS_SELECT;
          break;
        case "get_list_sections":
          answer = await axios_api(
            `api/Sections`,
            true,
            "get"
          );
          type = SECTIONS_LIST;
          break;
        case "get_list_sections_by_course_id":
          answer = await axios_api(
            `api/SectionsByCourseId?id=${data.Id}`,
            true,
            "get"
          );
          type = SECTIONS_LIST;
          break;
        case "get_list_sections_by_course_id_with_products":
          answer = await axios_api(
            `api/SectionsByCourseIdWithProducts?id=${data.Id}`,
            true,
            "get"
          );
          type = SECTIONS_LIST;
          break;

        case "get_section":
          answer = await axios_api(
            `api/Section?id=${
              data.Id 
            }`,
            true,
            "get"
          );
          break;

        case "put_section":
          answer = await axios_api(
            `api/Section?id=${data.Id}`,
            true,
            "put",
            data
          );
          if (answer.status === 204) {
            type = "put";
          }
          break;

        case "post_section":
          answer = await axios_api("api/Section", true, "post", data);
          break;
        
        case "delete_section":
          answer = await axios_api(
            `api/Section?id=${data.Id}`,
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
        type: SECTION_ERROR,
        payload: messageError,
      });
    }
  };
  



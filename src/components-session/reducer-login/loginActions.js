import {
  LOGIN_CARGANDO,
  LOGIN_ERROR,
  LOGIN_HANDLE_CHANGE,
  LOGIN_CLEAN_STATE,
  LOGIN_USER,
  LOGIN_HANDLE_VALIDATION,
} from "./loginTypes";

import {
  axios_api,
  errorHandler,
  setLocalStorage,
} from "../../components-api/ConfigApi";

/*
 *Metodo para serializar un objeto
 */
const parserJson = (obj) => {
  var jsonSerialize = "";
  for (const prop in obj) {
    jsonSerialize += prop + "=" + obj[prop] + "&";
  }
  jsonSerialize = jsonSerialize.slice(0, -1);
  return jsonSerialize;
};

export const loginHandleChange = (e, isInvalid) => (dispatch) => {
  dispatch({
    type: LOGIN_HANDLE_CHANGE,
    payload: { e: e, isInvalid: isInvalid },
  });
};

export const loginHandleValidation = (validation) => (dispatch) => {
  dispatch({
    type: LOGIN_HANDLE_VALIDATION,
    payload: validation,
  });
};

export const loginCleanState = () => (dispatch) => {
  dispatch({
    type: LOGIN_CLEAN_STATE,
  });
};

export const loginMethods = (data) => async (dispatch) => {
  dispatch({
    type: LOGIN_CARGANDO,
  });
  try {
    setLocalStorage();
    const object = parserJson(data);
    const answer = await axios_api("Token", false, "post", object);
    setLocalStorage(answer);
    dispatch({
      type: LOGIN_USER,
      payload: answer.data,
    });
  } catch (error) {
    
    let messageError = errorHandler(error);
    dispatch({
      type: LOGIN_ERROR,
      payload: messageError,
    });
  }
};

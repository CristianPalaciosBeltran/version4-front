import {
  SIGN_UP_CARGANDO,
  SIGN_UP_ERROR,
  SIGN_UP_HANDLE_CHANGE,
  SIGN_UP_CLEAN_STATE,
  SIGN_UP_USER,
  SIGN_UP_HANDLE_VALIDATION,
  SIGN_UP_PRELOADED_DATA
} from "./signUpTypes";

import { axios_api, errorHandler } from "../../components-api/ConfigApi";

export const signUpHandleChange = (e, isInvalid) => (dispatch) => {
  dispatch({
    type: SIGN_UP_HANDLE_CHANGE,
    payload: { e: e, isInvalid: isInvalid },
  });
};

export const signUpHandleValidation = (validation) => (dispatch) => {
  dispatch({
    type: SIGN_UP_HANDLE_VALIDATION,
    payload: validation,
  });
};

export const signUpCleanState = () => (dispatch) => {
  dispatch({
    type: SIGN_UP_CLEAN_STATE,
  });
};

export const signUpPreloadedData = (data) => (dispatch) => {
  dispatch({
    type: SIGN_UP_PRELOADED_DATA,
    payload: data,
  });
};


export const signUpMethods = (data, token) => async (dispatch) => {
  dispatch({
    type: SIGN_UP_CARGANDO,
  });
  try {
    const answer = await axios_api("api/Account/Register", token, "post", data);
    dispatch({
      type: SIGN_UP_USER,
      payload: answer.data,
    });
  } catch (error) {
    let messageError = errorHandler(error);
    dispatch({
      type: SIGN_UP_ERROR,
      payload: messageError,
    });
  }
};

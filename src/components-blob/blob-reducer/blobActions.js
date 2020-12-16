import {
  BLOB_CARGANDO,
  BLOB_ERROR,
  BLOB_HANDLE_CHANGE,
  BLOB_HANDLE_VALIDATION,
  BLOB_CLEAN_STATE,
  BLOB_CRUD,
} from "./blobType";

import { axios_api, errorHandler } from "../../components-api/ConfigApi";

export const blobHandleChange = (e, isInvalid) => (dispatch) => {
  dispatch({
    type: BLOB_HANDLE_CHANGE,
    payload: { e: e, isInvalid: isInvalid },
  });
};

export const blobHandleValidation = (validation) => (dispatch) => {
  dispatch({
    type: BLOB_HANDLE_VALIDATION,
    payload: validation,
  });
};

export const blobCleanState = () => (dispatch) => {
  dispatch({
    type: BLOB_CLEAN_STATE,
  });
};

export const blobMethods = (data, method) => async (dispatch) => {
  dispatch({
    type: BLOB_CARGANDO,
  });
  try {
    let answer;
    let type = BLOB_CRUD;
    switch (method) {
      case "post_blob":
        answer = await axios_api(`api/Blob`, true, "post", data);
        break;
      case "put_blob":
        answer = await axios_api(
          `api/Blob?id=${data.id}`,
          true,
          "put",
          data.blob
        );
        break;
      default:
        break;
    }

    //answer = { data: answer.data[0], status: answer.status };
    dispatch({
      type: type,
      payload: answer.data[0],
    });
  } catch (error) {
    let messageError = errorHandler(error);
    dispatch({
      type: BLOB_ERROR,
      payload: messageError,
    });
  }
};

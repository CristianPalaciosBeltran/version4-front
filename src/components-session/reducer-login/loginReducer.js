import {
  LOGIN_CARGANDO,
  LOGIN_ERROR,
  LOGIN_HANDLE_CHANGE,
  LOGIN_CLEAN_STATE,
  LOGIN_USER,
  LOGIN_HANDLE_VALIDATION
} from "./loginTypes";

const INITIAL_STATE = {
  api_actions: {
    cargando: false,
    error: "",
  },
  data: {
    roles: localStorage.getItem("role"),
    grant_type: "password",
    username: "",
    password: "",
    access_token: "",
  },
  validations: {
    username: "",
    password: "",
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_CARGANDO:
      return {
        ...state,
        api_actions: {
          ...state.api_actions,
          cargando: true,
          error: "",
        },
      };
    case LOGIN_ERROR:
      return {
        ...state,
        api_actions: {
          ...state.api_actions,
          cargando: false,
          error: action.payload,
        },
      };
    case LOGIN_HANDLE_CHANGE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.e.name]: action.payload.e.value,
        },
        validations: {
          ...state.validations,
          [action.payload.e.name]: action.payload.isInvalid,
        },
      };
    case LOGIN_HANDLE_VALIDATION:
      return {
        ...state,
        validations: {
          ...state.validations,
          [action.payload.name]: action.payload.isInvalid,
        },
      };
    case LOGIN_CLEAN_STATE:
      return {
        ...state,
        api_actions: {
          ...state.api_actions,
          cargando: false,
          error: "",
        },
        data: {
          roles: localStorage.getItem("role"),
          grant_type: "password",
          username: "",
          password: "",
        },
        validations: {
          username: "",
          password: "",
        },
      };
    case LOGIN_USER:
      return {
        ...state,
        api_actions: {
          ...state.api_actions,
          cargando: false,
          error: "",
        },
        data: {
          grant_type: "password",
          roles: action.payload.roles,
          username: action.payload.username,
          password: action.payload.password,
          access_token: action.payload.access_token,
          userName: action.payload.userName,
        },
        validations: {
          username: "",
          password: "",
        },
      };
    default:
      return state;
  }
};

export default reducer;
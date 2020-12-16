import {
    CHANGE_PASSWORD_CARGANDO,
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_HANDLE_CHANGE,
    CHANGE_PASSWORD_CLEAN_STATE,
    CHANGE_PASSWORD_USER,
    CHANGE_PASSWORD_HANDLE_VALIDATION,
  } from "./changePasswordTypes";

  const INITIAL_STATE = {
    api_actions: {
      cargando: false,
      error: "",
    },
    data: {
      phoneOrEmail: '',
      Code:'',
      NewPassword:'',
      ConfirmNewPassword:'',
      usernameOrEmailOrPhoneNumber:'',
    },
    validations: {
      phoneOrEmail: "",
      Code:true,
      NewPassword:'',
      ConfirmNewPassword:'',
    },
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case CHANGE_PASSWORD_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case CHANGE_PASSWORD_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
      case CHANGE_PASSWORD_HANDLE_CHANGE:
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
      case CHANGE_PASSWORD_HANDLE_VALIDATION:
        return {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.name]: action.payload.isInvalid,
          },
        };
      case CHANGE_PASSWORD_CLEAN_STATE:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          data: {
            phoneOrEmail: '',
            Code:'',
            NewPassword:'',
            ConfirmNewPassword:'',
            usernameOrEmailOrPhoneNumber:''
      
          },
          validations: {
            phoneOrEmail: "",
            Code:'',
            NewPassword:'',
            ConfirmNewPassword:'',
          },
        };
      case CHANGE_PASSWORD_USER:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          data: {
            phoneOrEmail: '',
            Code:'',
            NewPassword:'',
            ConfirmNewPassword:'',
            usernameOrEmailOrPhoneNumber:''
      
          },
          validations: {
            phoneOrEmail: "",
            Code:'',
            NewPassword:'',
            ConfirmNewPassword:'',
          },
        };
        case "contact_info_put":
          return {
            ...state,
            api_actions: {
              ...state.api_actions,
              cargando: false,
              error: "",
            },
          };
      default:
        return state;
    }
  };

  export default reducer;
  
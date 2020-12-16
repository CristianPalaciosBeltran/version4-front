import {
    ADMIN_CARGANDO,
    ADMIN_ERROR,
    ADMIN_HANDLE_CHANGE,
    ADMIN_CLEAN_STATE,
    ADMIN_CRUD,
    ADMIN_HANDLE_VALIDATION,
    ADMIN_USERS_LIST,
  } from "./adminTypes";
  
  const INITIAL_STATE = {
    api_actions: {
      cargando: false,
      cargandoUsername: false,
      errorUsername: '',
      cargandoEmail: false,
      errorEmail: '',
      cargandoPhone: false,
      errorPhone: '',
      cargandoPassword: false,
      errorPassword: '',
      cargandoValidateAccount: '',
      errorValidateAccount: '',
      error: "",
    },
    data: {
      Id: '',
      UserName:'',
      Email: '',
      EmailConfirmed: '',
      PhoneNumber: '',
      Password: '',
      ConfirmPassword: '',
    },
    validations: {
      UserName:'',
      Email: '',
      EmailConfirmed: '',
      PhoneNumber: '',
      Password: '',
      ConfirmPassword: '',
    },
    list_users: [],
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADMIN_CARGANDO:
        
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            [action.payload]: true,
            errorUsername: '',
            errorEmail: '',
            error: "",    
            errorPhone: '',
            errorPassword: '',
            errorValidateAccount: ''
          },
        };
      case ADMIN_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            cargandoUsername: false,
            cargandoEmail: false,
            cargandoPhone: false,
            cargandoPassword: false,
            cargandoValidateAccount: false,
            [action.payload.typeError]: action.payload.messageError,
          },
        };
      case ADMIN_HANDLE_CHANGE:
        return {
          ...state,
          data: {
            ...state.data,
            [action.payload.e.name]: action.payload.e.files
              ? [action.payload.e.files[0]]
              : action.payload.e.value,
          },
          validations: {
            ...state.validations,
            [action.payload.e.name]: action.payload.isInvalid,
          },
        };
      case ADMIN_HANDLE_VALIDATION:
        return {
            ...state,
            validations: {
              ...state.validations,
              [action.payload.name]: action.payload.isInvalid,
            },
          };
      case ADMIN_CLEAN_STATE:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            errorUsername: '',
            errorEmail: '',
            error: "",    
            errorPhone: '',
            errorPassword: '',
            cargando: false,
            cargandoUsername: false,
            cargandoEmail: false,
            cargandoPhone: false,
            cargandoPassword: false,
            errorValidateAccount: '',
            cargandoValidateAccount: false
          },
          data: {},
          validations: {},
        };
      case ADMIN_CRUD:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            [action.payload.cargando]: false,
            errorUsername: '',
            errorEmail: '',
            error: "",    
            errorPhone: '',
            errorPassword: '',
            cargando: false,
            cargandoUsername: false,
            cargandoEmail: false,
            cargandoPhone: false,
            cargandoPassword: false,
            errorValidateAccount: '',
            cargandoValidateAccount: false
          },
          data: {
            Id: action.payload.Id,
            UserName: action.payload.UserName ? action.payload.UserName : '',
            Email: action.payload.Email ? action.payload.Email : '',
            EmailConfirmed: action.payload.EmailConfirmed ? action.payload.EmailConfirmed : '',
            PhoneNumber: action.payload.PhoneNumber ? action.payload.PhoneNumber : '',
          },
          validations: {
            UserName: true,
            Email: true,
            EmailConfirmed: '',
            PhoneNumber: '',
            Password: '',
            ConfirmPassword: '',
          },
        };
  
      case ADMIN_USERS_LIST:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            errorUsername: '',
            errorEmail: '',
            error: "",    
            errorPhone: '',
            errorPassword: '',
            cargando: false,
            cargandoUsername: false,
            cargandoEmail: false,
            cargandoPhone: false,
            cargandoPassword: false,
            errorValidateAccount: '',
            cargandoValidateAccount: false
          },
          list_users: action.payload,
        };
  
        case "contact_info_put":
          return {
            ...state,
            api_actions: {
              ...state.api_actions,
              errorUsername: '',
              errorEmail: '',
              error: "",    
              errorPhone: '',
              errorPassword: '',
              cargando: false,
              cargandoUsername: false,
              cargandoEmail: false,
              cargandoPhone: false,
              cargandoPassword: false,
              errorValidateAccount: '',
              cargandoValidateAccount: false
            },
          };
  
      default:
        return { ...state };
    }
  };

  export default reducer;
  
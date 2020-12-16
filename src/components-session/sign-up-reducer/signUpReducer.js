import {
  SIGN_UP_CARGANDO,
  SIGN_UP_ERROR,
  SIGN_UP_HANDLE_CHANGE,
  SIGN_UP_CLEAN_STATE,
  SIGN_UP_USER,
  SIGN_UP_HANDLE_VALIDATION,
  SIGN_UP_PRELOADED_DATA
} from "./signUpTypes";

const INITIAL_STATE = {
  api_actions: {
    cargando: false,
    error: "",
  },
  data: {
    Id: "",
    Roles: "",
    UserName: "",
    PhoneNumber: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    ValidateByPhoneOrEmail: "email",
    TypeUser: '',
    Idd: "",
  },
  validations: {
    UserName: "",
    PhoneNumber: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    ValidateByPhoneOrEmail: "",
    Idd: "",
  },
};

const reducer =  (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_CARGANDO:
      return {
        ...state,
        api_actions: {
          ...state.api_actions,
          cargando: true,
          error: "",
        },
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        api_actions: {
          ...state.api_actions,
          cargando: false,
          error: action.payload,
        },
      };
    case SIGN_UP_HANDLE_CHANGE:
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
    case SIGN_UP_HANDLE_VALIDATION:
      return {
        ...state,
        validations: {
          ...state.validations,
          [action.payload.props.nameInput]: action.payload.isInvalid,
        },
      };
    case SIGN_UP_CLEAN_STATE:
      return {
        ...state,
        api_actions: {
          ...state.api_actions,
          cargando: false,
          error: "",
        },
        data: {
          Id: "",
          Roles: "",
          UserName: "",
          PhoneNumber: "",
          Email: "",
          Password: "",
          ConfirmPassword: "",
          ValidateByPhoneOrEmail: "email",
          Idd: "",
          TypeUser: ""
        },
        validations: {
          UserName: "",
          PhoneNumber: "",
          Email: "",
          Password: "",
          ConfirmPassword: "",
          ValidateByPhoneOrEmail: "",
          Idd: "",
          TypeUser:""
        },
      };
    case SIGN_UP_USER:
      return {
        ...state,
        api_actions: {
          ...state.api_actions,
          cargando: false,
          error: "",
        },
        data: {
          Id: action.payload.Id,
          Roles: action.payload.Roles,
          UserName: action.payload.UserName,
          PhoneNumber: action.payload.PhoneNumber,
          Email: action.payload.Email,
          Password: action.payload.Password,
          ConfirmPassword: action.payload.ConfirmPassword,
          ValidateByPhoneOrEmail: "email",
          Idd: action.payload.Idd,
          TypeUser: action.payload.TypeUser
        },
        validations: {
          UserName: "",
          PhoneNumber: "",
          Email: "",
          Password: "",
          ConfirmPassword: "",
          ValidateByPhoneOrEmail: "",
          Idd: "",
          TypeUser: ""
        },
      };

      case SIGN_UP_PRELOADED_DATA:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          data: {
            Id: action.payload.Id,
            Roles: action.payload.Roles,
            UserName: action.payload.UserName,
            PhoneNumber: action.payload.PhoneNumber,
            Email: action.payload.Email,
            Password: action.payload.Password,
            ConfirmPassword: action.payload.ConfirmPassword,
            ValidateByPhoneOrEmail: "email",
            Idd: action.payload.Idd,
            TypeUser: action.payload.TypeUser
          },
          validations: {
            UserName: "",
            PhoneNumber: "",
            Email: "",
            Password: "",
            ConfirmPassword: "",
            ValidateByPhoneOrEmail: "",
            Idd: "",
            TypeUser: ""
          },
        };
    default:
      return state;
  }
};

export default reducer;

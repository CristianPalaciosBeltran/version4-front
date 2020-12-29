import {
    PERSONAL_DETAIL_CARGANDO,
    PERSONAL_DETAIL_ERROR,
    PERSONAL_DETAIL_HANDLE_CHANGE,
    PERSONAL_DETAIL_CLEAN_STATE,
    PERSONAL_DETAIL_CRUD,
    PERSONAL_DETAILS_LIST,
    PERSONAL_DETAIL_HANDLE_VALIDATION
  } from "./personalDetailTypes";
  
  const INITIAL_STATE = {
    api_actions: {
      cargando: false,
      error: "",
    },
    data: {
      Id: 0,
      DateCreated:'',
      DateModified:'',
      Name:'',
      LastName: "",
      SecondLastName:'',
      CompanyId:'',
      RFC:'',
      Birthdate:'',
      Gender:''
    },
    validations: {
      Name: "",
      LastName:'',
      SecondLastName:'',
      RFC:'',
      Birthdate:'',
      Gender:''
    },
    list_personal_details: [],
  };
  
  const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PERSONAL_DETAIL_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case PERSONAL_DETAIL_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
      case PERSONAL_DETAIL_HANDLE_CHANGE:
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
      case PERSONAL_DETAIL_HANDLE_VALIDATION:
        
        return {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.name]: action.payload.isInvalid,
          },
        };
      case PERSONAL_DETAIL_CLEAN_STATE:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          data: {
            Id: 0,
            DateCreated:'',
            DateModified:'',
            Name:'',
            LastName: "",
            SecondLastName:'',
            CompanyId:'',
            RFC:'',
            Birthdate:'',
            Gender:''
          },
          validations: {
            Name: "",
            LastName:'',
            SecondLastName:'',
            RFC:'',
            Birthdate:'',
            Gender:''
          },
          list_personal_details: [],
        };
      case PERSONAL_DETAIL_CRUD:
        debugger
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          data: {
            Id: action.payload.Id,
            DateCreated: action.payload.DateCreated,
            DateModified: action.payload.DateModified,
            Name: action.payload.Name,
            LastName:  action.payload.LastName,
            SecondLastName: action.payload.SecondLastName,
            CompanyId: action.payload.CompanyId,
            RFC: action.payload.RFC,
            Birthdate: action.payload.Birthdate?.slice(0, 10),
            Gender:action.payload.Gender 
          },
          validations: {
            Name: action.payload.Name ? true : '',
            LastName: action.payload.LastName ? true : '',
            SecondLastName: action.payload.SecondLastName ? true : '',
            RFC: action.payload.RFC ? true : '',
            Birthdate: action.payload.Birthdate ? true : '',
            Gender: action.payload.Gender ? true : ''
          },
          list_personal_details: [],
        };
  
      case PERSONAL_DETAILS_LIST:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          list_personal_details: action.payload,
        };
  
      case "personal_detail_put":
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
        };
      default:
        return { ...state };
    }
  };
  
  export default Reducer;
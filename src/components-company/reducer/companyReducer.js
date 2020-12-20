import {
    COMPANY_CARGANDO,
    COMPANY_ERROR,
    COMPANY_HANDLE_CHANGE,
    COMPANY_CLEAN_STATE,
    COMPANY_CRUD,
    COMPANIES_LIST,
    COMPANY_HANDLE_VALIDATION
  } from "./companyTypes";
  
  const INITIAL_STATE = {
    api_actions: {
      cargando: false,
      error: "",
    },
    data: {
      Id: 0,
      DateCreated:'',
      DateModified:'',
      UserId:'',
      TradeName: "",
      BusinessName:'',
      BusinessActivity: '',
      fileCover: '',
      Blobs:[],
      
    },
    validations: {
      TradeName: "",
      BusinessName:'',
      BusinessActivity:'',
      fileCover: ''
    },
    list_companies: [],
  };
  
  const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case COMPANY_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case COMPANY_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
      case COMPANY_HANDLE_CHANGE:
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
      case COMPANY_HANDLE_VALIDATION:
        
        return {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.name]: action.payload.isInvalid,
          },
        };
      case COMPANY_CLEAN_STATE:
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
            UserId:'',
            TradeName: "",
            BusinessName:'',
            BusinessActivity: '',
            fileCover: '',
            Blobs:[],
            
          },
          validations: {
            TradeName: "",
            BusinessName:'',
            BusinessActivity:'',
            fileCover: ''
          },
          list_companies: [],
        };
      case COMPANY_CRUD:
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
            UserId: action.payload.UserId,
            TradeName:  action.payload.TradeName,
            BusinessName: action.payload.BusinessName,
            BusinessActivity:  action.payload.BusinessActivity,
            fileCover: '',
            Blobs:[],
            
          },
          validations: {
            TradeName: true,
            BusinessName: true,
            BusinessActivity: true,
            fileCover: ''
          },
          list_brands: [],
        };
  
      case COMPANIES_LIST:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          list_companies: action.payload,
        };
  
      case "product_put":
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
import {
    JOB_DETAIL_CARGANDO,
    JOB_DETAIL_ERROR,
    JOB_DETAIL_HANDLE_CHANGE,
    JOB_DETAIL_CLEAN_STATE,
    JOB_DETAIL_CRUD,
    JOB_DETAILS_LIST,
    JOB_DETAIL_HANDLE_VALIDATION
  } from "./jobDetailTypes";
  
  const INITIAL_STATE = {
    api_actions: {
      cargando: false,
      error: "",
    },
    data: {
      Id: 0,
      DateCreated:'',
      DateModified:'',
      PersonDetailId:'',
      DateAdmission: "",
      Contract:'',
      Benefits:'',
      IntegratedSalary:'',
      DailySalary:'',
      Type:''
    },
    validations: {
        DateAdmission: "",
        Contract:'',
        Benefits:'',
        IntegratedSalary:'',
        DailySalary:'',
        Type:''
    },
    list_job_details: [],
  };
  
  const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case JOB_DETAIL_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case JOB_DETAIL_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
      case JOB_DETAIL_HANDLE_CHANGE:
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
      case JOB_DETAIL_HANDLE_VALIDATION:
        
        return {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.name]: action.payload.isInvalid,
          },
        };
      case JOB_DETAIL_CLEAN_STATE:
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
            PersonDetailId:'',
            DateAdmission:'',
            Contract:'',
            Benefits:'',
            IntegratedSalary:'',
            DailySalary:'',
            Type:''
          },
          validations: {
              DateAdmission: "",
              Contract:'',
              Benefits:'',
              IntegratedSalary:'',
              DailySalary:'',
              Type:''
          },
          list_job_details: [],
        };
      case JOB_DETAIL_CRUD:
        
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
            PersonDetailId: action.payload.PersonDetailId,
            DateAdmission: action.payload.DateAdmission?.slice(0, 10),
            Contract: action.payload.Contract,
            Benefits: action.payload.Benefits,
            IntegratedSalary: action.payload.IntegratedSalary,
            DailySalary: action.payload.DailySalary,
            Type: action.payload.Type
          },
          validations: {
              DateAdmission: action.payload.DateAdmission ? true : '',
              Contract: action.payload.Contract ? true : '',
              Benefits: action.payload.Benefits ? true : '',
              IntegratedSalary: action.payload.IntegratedSalary ? true : '',
              DailySalary: action.payload.DailySalary ? true : '',
              Type: action.payload.Type ? true : ''
          },
          
          list_job_details: [],
        };
  
      case JOB_DETAILS_LIST:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          list_job_details: action.payload,
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
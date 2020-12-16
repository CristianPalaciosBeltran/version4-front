import {
    SECTION_CARGANDO,
    SECTION_ERROR,
    SECTION_HANDLE_CHANGE,
    SECTION_CLEAN_STATE,
    SECTION_CRUD,
    SECTIONS_LIST,
    SECTIONS_SELECT,
    SECTION_HANDLE_VALIDATION
  } from "./sectionTypes";
  
  const INITIAL_STATE = {
    api_actions: {
      cargando: false,
      error: "",
    },
    data: {
      Id: 0,
      DateCreated:'',
      DateModified:'',
      Name: "",
      CourseId:'',
    },
    validations: {
      Name: "",
      CourseId:'',
    },
    list_sections: [],
    list_sections_select: []
  };
  
  const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SECTION_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case SECTION_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
      case SECTION_HANDLE_CHANGE:
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
      case SECTION_HANDLE_VALIDATION:
        return {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.name]: action.payload.isInvalid,
          },
        };
      case SECTION_CLEAN_STATE:
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
            Name: "",
            CourseId: ""
          },
          validations: {
            Name: "",
            CourseId:'',
          },
          list_sections: [],
          list_sections_select: []
        };
      case SECTION_CRUD:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          data: {
            Id: action.payload.Id,
            DateCreated:action.payload.DateCreated,
            DateModified:action.payload.DateModified,
            Name: action.payload.Name,
            CourseId:action.payload.CourseId,
          },
          validations: {
            Name: true,
            CourseId:true,
          },
          list_brands: [],
          list_sections_select: []
        };
  
      case SECTIONS_LIST:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          list_sections: action.payload,
        };
      case SECTIONS_SELECT:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          list_sections_select: action.payload,
        };
  
      case "put":
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

  export default reducer;
  
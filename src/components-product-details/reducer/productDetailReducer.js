import {
    PRODUCT_DETAIL_CARGANDO,
    PRODUCT_DETAIL_ERROR,
    PRODUCT_DETAIL_HANDLE_CHANGE,
    PRODUCT_DETAIL_CLEAN_STATE,
    PRODUCT_DETAIL_CRUD,
    PRODUCT_DETAILS_LIST,
    PRODUCT_DETAIL_HANDLE_VALIDATION
  } from "./productDetailsTypes";
  
  const INITIAL_STATE = {
    api_actions: {
      cargando: false,
      error: "",
    },
    data: {
      Id: 0,
      DateCreated:'',
      DateModified:'',
      SubTitle:'',
      Description:'',
      ProductId: '',
      BlobId: '',
      fileZip: '',
      Blob: {}
    },
    validations: {
        SubTitle:'',
        Description:'',
        fileZip: ''
    },
    list_product_details: [],
  };
  
  const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PRODUCT_DETAIL_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case PRODUCT_DETAIL_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
      case PRODUCT_DETAIL_HANDLE_CHANGE:
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
      case PRODUCT_DETAIL_HANDLE_VALIDATION:
        
        return {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.name]: action.payload.isInvalid,
          },
        };
      case PRODUCT_DETAIL_CLEAN_STATE:
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
            SubTitle:'',
            Description:'',
            ProductId: '',
            BlobId: '',
            fileZip: '',
            Blob: {}
          },
          validations: {
              SubTitle:'',
              Description:'',
              fileZip: ''
          },
          list_product_details: [],
        };
      case PRODUCT_DETAIL_CRUD:
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
            SubTitle:action.payload.SubTitle,
            Description:action.payload.Description,
            ProductId: action.payload.ProductId,
            BlobId: action.payload.BlobId,
            Blob: action.payload.Blob
          },
          validations: {
              SubTitle:true,
              Description:true,
              fileZip: ''
          },
          list_brands: [],
        };
  
      case PRODUCT_DETAILS_LIST:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          list_product_details: action.payload,
        };
  
      case "product_detail_put":
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
import {
    PRODUCT_CARGANDO,
    PRODUCT_ERROR,
    PRODUCT_HANDLE_CHANGE,
    PRODUCT_CLEAN_STATE,
    PRODUCT_CRUD,
    PRODUCTS_LIST,
    PRODUCT_HANDLE_VALIDATION
  } from "./productTypes";
  
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
      Name: "",
      Description:'',
      Price: '',
      ProductCategoryId:'',
      fileCover: '',
      Blobs:[],
      Categories: []
    },
    validations: {
      Name: "",
      Description:'',
      ProductCategoryId:'',
      fileCover: ''
    },
    list_products: [],
  };
  
  const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PRODUCT_CARGANDO:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: true,
            error: "",
          },
        };
      case PRODUCT_ERROR:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: action.payload,
          },
        };
      case PRODUCT_HANDLE_CHANGE:
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
      case PRODUCT_HANDLE_VALIDATION:
        
        return {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.name]: action.payload.isInvalid,
          },
        };
      case PRODUCT_CLEAN_STATE:
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
            Name: "",
            Description:'',
            Price: '',
            ProductCategoryId:'',
            Blobs:[],
            Categories: [],
            fileCover: ''
          },
          validations: {
            Name: "",
            Description:'',
            Price:'',
            ProductCategoryId:'',
            fileCover: ''
          },
          list_products: [],
        };
      case PRODUCT_CRUD:
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
            UserId:action.payload.UserId,
            Name: action.payload.Name,
            Description:action.payload.Description,
            Price: action.payload.Price,
            ProductCategoryId:action.payload.ProductCategoryId,
            Blobs: action.payload.Blobs,
            Categories: action.payload.Categories
          },
          validations: {
            Name: true,
            Description:true,
            Price: true,
            ProductCategoryId: true,
            fileCover: ''
          },
          list_brands: [],
        };
  
      case PRODUCTS_LIST:
        return {
          ...state,
          api_actions: {
            ...state.api_actions,
            cargando: false,
            error: "",
          },
          list_products: action.payload,
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
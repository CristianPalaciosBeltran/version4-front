import {
  BLOB_CARGANDO,
  BLOB_ERROR,
  BLOB_HANDLE_CHANGE,
  BLOB_HANDLE_VALIDATION,
  BLOB_CLEAN_STATE,
  BLOB_CRUD,
} from "./blobType";

const INITIAL_STATE = {
  api_actions: {
    cargando: false,
    error: "",
  },
  data: {
    Id: 0,
    UserId: "",
    DateCreated: "",
    DateModified: "",
    BlobName: "",
    BlobTypeId: "",
    ContainerName: "",
    IsPrivate: true,
    Uri: null,
    BlobType: null,
    Brand_Blob: [],
    Product_Blob: [],
    BlogPosts: [],
    AspNetUsers: [],
  },
  validations: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BLOB_CARGANDO:
      return {
        ...state,
        api_actions: {
          ...state.api_actions,
          cargando: true,
          error: "",
        },
      };
    case BLOB_ERROR:
      return {
        ...state,
        api_actions: {
          ...state.api_actions,
          cargando: false,
          error: action.payload,
        },
      };
    case BLOB_HANDLE_CHANGE:
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

    case BLOB_HANDLE_VALIDATION:
      let messageError = "";
      if (action.payload.props.valueInput === "") {
        messageError = "El campo no puede ir vacio";
      }
      if (action.payload.props.isInvalid !== "") {
        messageError = action.payload.props.isInvalid;
      }
      return {
        ...state,
        validations: {
          ...state.validations,
          [action.payload.props.nameInput]: messageError,
        },
      };
    case BLOB_CLEAN_STATE:
      return {
        ...state,
        api_actions: {
          ...state.api_actions,
          cargando: false,
          error: "",
        },
        data: {
          Id: 0,
          UserId: "",
          DateCreated: "",
          DateModified: "",
          BlobName: "",
          BlobTypeId: "",
          ContainerName: "",
          IsPrivate: true,
          Uri: null,
          BlobType: null,
          Brand_Blob: [],
          Product_Blob: [],
          BlogPosts: [],
          AspNetUsers: [],
        },
        validations: {},
      };

    case BLOB_CRUD:
      return {
        ...state,
        api_actions: {
          ...state.api_actions,
          cargando: false,
          error: "",
        },
        data: {
          Id: action.payload.Id,
          UserId: action.payload.UserId,
          DateCreated: action.payload.DateCreated,
          DateModified: action.payload.DateModified,
          BlobName: action.payload.BlobName,
          BlobTypeId: action.payload.BlobTypeId + "",
          ContainerName: action.payload.ContainerName,
          IsPrivate: action.payload.IsPrivate,
          Uri: action.payload.Uri,
          BlobType: action.payload.BlobType,
          Brand_Blob: action.payload.Brand_Blob,
          Product_Blob: action.payload.Product_Blob,
          BlogPosts: action.payload.BlogPosts,
          AspNetUsers: action.payload.AspNetUsers,
        },
        validations: {},
      };

    default:
      return { ...state };
  }
};

import { axios_api } from "../../components-api/ConfigApi";

export const PRODUCT_CARGANDO = "product_cargando";
export const PRODUCT_ERROR = "product_error";
export const PRODUCT_HANDLE_CHANGE = "product_handle_change";
export const PRODUCT_CLEAN_STATE = "product_clean_state";
export const PRODUCT_CRUD = "product_crud";
export const PRODUCTS_LIST = "products_list";
export const PRODUCT_HANDLE_VALIDATION = "product_handle_validation";


export const GetProducts = async()=> {
    const  answer = await axios_api(
        `api/Products`,
        true,
        "get"
      );
    return {res:answer, type: PRODUCTS_LIST};
}

export const GetProductsByCategoryId = async(data)=> {
    debugger
    const  answer = await axios_api(
        `api/ProductsByCategoryId?id=${data.Id}`,
        true,
        "get"
      );
    return {res:answer, type: PRODUCTS_LIST};
}

export const GetProduct = async(data)=> {
    const answer = await axios_api(
        `api/Product?id=${data.Id }`,
        true,
        "get"
    );
    return {res:answer, type: PRODUCT_CRUD};
}

export const PutProduct = async(data)=> {
    const answer = await axios_api(
        `api/Product?id=${data.Id}${data.includeBlobs ? ``:``}`,
        true,
        "put",
        data
    );
    return {res:answer, type: 'product_put'};
}

export const PostProduct = async(data)=> {
    const  answer = await axios_api("api/Product", true, "post", data);
    return {res:answer, type: PRODUCT_CRUD};
}

export const DeleteProduct = async(data)=> {
    const answer = await axios_api(
        `api/Product?id=${data.Id}`,
        true,
        "delete"
    );
    return {res:answer, type: PRODUCT_CRUD};
}



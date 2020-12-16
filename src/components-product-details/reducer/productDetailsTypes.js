import { axios_api } from "../../components-api/ConfigApi";

export const PRODUCT_DETAIL_CARGANDO = "product_detail_cargando";
export const PRODUCT_DETAIL_ERROR = "product_detail_error";
export const PRODUCT_DETAIL_HANDLE_CHANGE = "product_detail_handle_change";
export const PRODUCT_DETAIL_CLEAN_STATE = "product_detail_clean_state";
export const PRODUCT_DETAIL_CRUD = "product_detail_crud";
export const PRODUCT_DETAILS_LIST = "product_details_list";
export const PRODUCT_DETAIL_HANDLE_VALIDATION = "product_detail_handle_validation";

export const GetProductDetails = async()=> {
    const  answer = await axios_api(
        `api/ProductDetails`,
        true,
        "get"
      );
    return {res:answer, type: PRODUCT_DETAILS_LIST};
}

export const GetProductDetail = async(data)=> {
    const answer = await axios_api(
        `api/ProductDetail?id=${data.Id }`,
        true,
        "get"
    );
    return {res:answer, type: PRODUCT_DETAIL_CRUD};
}

export const GetProductDetailByProductId = async(data)=> {
    const answer = await axios_api(
        `api/ProductDetailByProductId?id=${data.Id }`,
        true,
        "get"
    );
    return {res:answer, type: PRODUCT_DETAIL_CRUD};
}

export const PutProductDetail = async(data)=> {
    const answer = await axios_api(
        `api/ProductDetail?id=${data.Id}`,
        true,
        "put",
        data
    );
    return {res:answer, type: 'product_detail_put'};
}

export const PostProductDetail = async(data)=> {
    const  answer = await axios_api("api/ProductDetail", true, "post", data);
    return {res:answer, type: PRODUCT_DETAIL_CRUD};
}

export const DeleteProductDetail = async(data)=> {
    const answer = await axios_api(
        `api/ProductDetail?id=${data.Id}`,
        true,
        "delete"
    );
    return {res:answer, type: PRODUCT_DETAIL_CRUD};
}

import { axios_api } from "../../components-api/ConfigApi";

export const CATEGORY_CARGANDO = "category_cargando";
export const CATEGORY_ERROR = "category_error";
export const CATEGORY_HANDLE_CHANGE = "category_handle_change";
export const CATEGORY_CLEAN_STATE = "category_clean_state";
export const CATEGORY_CRUD = "category_crud";
export const CATEGORIES_LIST = "categories_list";
export const CATEGORY_HANDLE_VALIDATION = "category_handle_validation";

export const GetCategories = async()=> {
    const  answer = await axios_api(
        `api/Categories`,
        true,
        "get"
      );
    return {res:answer, type: CATEGORIES_LIST};
}

export const GetCategory = async(data)=> {
    const  answer = await axios_api(`api/Category?id=${data.Id }`,
        true,
        "get"
    );
    return {res:answer, type: CATEGORY_CRUD};
}

export const PutCategory = async(data)=> {
    const  answer = await axios_api(`api/Category?id=${data.Id}`,
        true,
        "put",
        data
    );
    return {res:answer, type: 'put_category'};
}

export const PostCategory = async(data)=> {
    const answer = await axios_api("api/Category", true, "post", data);
    return {res:answer, type: CATEGORY_CRUD};
}

export const DeleteCategory = async(data)=> {
    const answer = await axios_api(`api/Category?id=${data.Id}`,
        true,
        "delete"
    );
    return {res:answer, type: CATEGORY_CRUD};
}

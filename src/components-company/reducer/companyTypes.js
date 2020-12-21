import { axios_api } from "../../components-api/ConfigApi";

export const COMPANY_CARGANDO = "company_cargando";
export const COMPANY_ERROR = "company_error";
export const COMPANY_HANDLE_CHANGE = "company_handle_change";
export const COMPANY_CLEAN_STATE = "company_clean_state";
export const COMPANY_CRUD = "company_crud";
export const COMPANIES_LIST = "companies_list";
export const COMPANY_HANDLE_VALIDATION = "company_handle_validation";

export const GetCompanies = async()=> {
    const  answer = await axios_api(
        `api/Companies`,
        true,
        "get"
      );
    return {res:answer, type: COMPANIES_LIST};
}

export const GetCompany = async(data)=> {
    const  answer = await axios_api(
        `api/Company?id=${data.Id}`,
        true,
        "get"
      );
    return {res:answer, type: COMPANY_CRUD};
}

export const PutCompany = async(data)=> {
    const  answer = await axios_api(
        `api/Company?id=${data.Id}`,
        true,
        "put",
        data
      );
    return {res:answer, type: 'company_put'};
}

export const PostCompany = async(data)=> {
    const  answer = await axios_api(
        `api/Company`,
        true,
        "post",
        data
      );
    return {res:answer, type: COMPANY_CRUD};
}

export const DeleteCompany = async(data)=> {
    const  answer = await axios_api(
        `api/Company?id=${data.Id}`,
        true,
        "delete"
      );
    return {res:answer, type: COMPANY_CRUD};
}
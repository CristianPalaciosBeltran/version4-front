import { axios_api } from "../../components-api/ConfigApi";

export const PERSONAL_DETAIL_CARGANDO = "personal_detail_cargando";
export const PERSONAL_DETAIL_ERROR = "personal_detail_error";
export const PERSONAL_DETAIL_HANDLE_CHANGE = "personal_detail_handle_change";
export const PERSONAL_DETAIL_CLEAN_STATE = "personal_detail_clean_state";
export const PERSONAL_DETAIL_CRUD = "personal_detail_crud";
export const PERSONAL_DETAILS_LIST = "personal_detail_list";
export const PERSONAL_DETAIL_HANDLE_VALIDATION = "personal_detail_handle_validation";

export const GetPersonalDetails = async()=> {
    const  answer = await axios_api(
        `api/PersonalDetails`,
        true,
        "get"
      );
    return {res:answer, type: PERSONAL_DETAILS_LIST};
}

export const GetPersonalDetailsByCompanyId = async(data)=> {
  const  answer = await axios_api(
      `api/PersonalDetailsByCompanyId?companyId=${data.companyId}`,
      true,
      "get"
    );
  return {res:answer, type: PERSONAL_DETAILS_LIST};
}


export const GetPersonalDetail = async(data)=> {
    const  answer = await axios_api(
        `api/PersonalDetail?id=${data.Id}`,
        true,
        "get"
      );
    return {res:answer, type: PERSONAL_DETAIL_CRUD};
}

export const PutPersonalDetail = async(data)=> {
    const  answer = await axios_api(
        `api/PersonalDetail?id=${data.Id}`,
        true,
        "put",
        data
      );
    return {res:answer, type: 'personal_detail_put'};
}

export const PostPersonalDetail = async(data)=> {
    const  answer = await axios_api(
        `api/PersonalDetail`,
        true,
        "post",
        data
      );
    return {res:answer, type: PERSONAL_DETAIL_CRUD};
}

export const DeletePersonalDetail = async(data)=> {
    const  answer = await axios_api(
        `api/PersonalDetail?id=${data.Id}`,
        true,
        "delete"
      );
    return {res:answer, type: PERSONAL_DETAIL_CRUD};
}
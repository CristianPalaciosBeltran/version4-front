import { axios_api } from "../../components-api/ConfigApi";

export const AREA_CARGANDO = "area_cargando";
export const AREA_ERROR = "area_error";
export const AREA_HANDLE_CHANGE = "area_handle_change";
export const AREA_CLEAN_STATE = "area_clean_state";
export const AREA_CRUD = "area_crud";
export const AREAS_LIST = "area_list";
export const AREA_HANDLE_VALIDATION = "area_handle_validation";

export const GetAreas = async()=> {
    const  answer = await axios_api(
        `api/Areas`,
        true,
        "get"
      );
    return {res:answer, type: AREAS_LIST};
}

export const GetAreasByCompanyId = async(data)=> {
  const  answer = await axios_api(
      `api/AreasByCompanyId?companyId=${data.companyId}`,
      true,
      "get"
    );
  return {res:answer, type: AREAS_LIST};
}


export const GetArea = async(data)=> {
    const  answer = await axios_api(
        `api/Area?id=${data.Id}`,
        true,
        "get"
      );
    return {res:answer, type: AREA_CRUD};
}

export const PutArea = async(data)=> {
    const  answer = await axios_api(
        `api/Area?id=${data.Id}`,
        true,
        "put",
        data
      );
    return {res:answer, type: 'area_put'};
}

export const PostArea = async(data)=> {
    const  answer = await axios_api(
        `api/Area`,
        true,
        "post",
        data
      );
    return {res:answer, type: AREA_CRUD};
}

export const DeleteArea = async(data)=> {
    const  answer = await axios_api(
        `api/Area?id=${data.Id}`,
        true,
        "delete"
      );
    return {res:answer, type: AREA_CRUD};
}
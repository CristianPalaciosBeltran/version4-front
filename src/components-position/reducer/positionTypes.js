import { axios_api } from "../../components-api/ConfigApi";

export const POSITION_CARGANDO = "position_cargando";
export const POSITION_ERROR = "position_error";
export const POSITION_HANDLE_CHANGE = "position_handle_change";
export const POSITION_CLEAN_STATE = "position_clean_state";
export const POSITION_CRUD = "position_crud";
export const POSITIONS_LIST = "position_list";
export const POSITION_HANDLE_VALIDATION = "position_handle_validation";

export const GetPositions = async()=> {
    const  answer = await axios_api(
        `api/Positions`,
        true,
        "get"
      );
    return {res:answer, type: POSITIONS_LIST};
}

export const GetPositionsByCompanyId = async(data)=> {
  const  answer = await axios_api(
      `api/PositionsByCompanyId?companyId=${data.companyId}`,
      true,
      "get"
    );
  return {res:answer, type: POSITIONS_LIST};
}


export const GetPosition = async(data)=> {
    const  answer = await axios_api(
        `api/Position?id=${data.Id}`,
        true,
        "get"
      );
    return {res:answer, type: POSITION_CRUD};
}

export const PutPosition = async(data)=> {
    const  answer = await axios_api(
        `api/Position?id=${data.Id}`,
        true,
        "put",
        data
      );
    return {res:answer, type: 'position_put'};
}

export const PostPosition = async(data)=> {
    const  answer = await axios_api(
        `api/Position`,
        true,
        "post",
        data
      );
    return {res:answer, type: POSITION_CRUD};
}

export const DeletePosition = async(data)=> {
    const  answer = await axios_api(
        `api/Position?id=${data.Id}`,
        true,
        "delete"
      );
    return {res:answer, type: POSITION_CRUD};
}
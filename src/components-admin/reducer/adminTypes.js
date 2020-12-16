import { axios_api } from "../../components-api/ConfigApi";

export const ADMIN_CARGANDO = "admin_cargando";
export const ADMIN_ERROR = "admin_error";
export const ADMIN_HANDLE_CHANGE = "admin_handle_change";
export const ADMIN_CLEAN_STATE = "admin_clean_state";
export const ADMIN_CRUD = "admin_crud";
export const ADMIN_HANDLE_VALIDATION = "admin_handle_validation";
export const ADMIN_USERS_LIST = "admins_list";

export const GetUserInfo = async(data)=> {
    const answer = await axios_api(
        `api/Account/UserInfo?userId=${data.userId}`,
        true,
        "get"
      );
    return {res:answer, type: ADMIN_CRUD};
}

export const GetUsersInfo = async(data) =>{
    const answer = await axios_api(
        `api/Account/UsersInfo?roleName=${data.roleName}`,
        true,
        "get"
    );
    return {res:answer, type:ADMIN_USERS_LIST};
}

export const PutContactInfo = async(data) => {
    const  answer = await axios_api(
        `api/Account/PutContactInfo`,
        true,
        "put",
        data
      );
    return {res:answer, type:'contact_info_put'};
}

export const ValidateAccount = async(data) => {
    const  answer = await axios_api(
        `api/Account/ValidateAccount`,
        true,
        "post",
        data
      );
    return {res:answer, type: ADMIN_CRUD};
}

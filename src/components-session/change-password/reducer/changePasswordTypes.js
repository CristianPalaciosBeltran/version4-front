import { axios_api } from "../../../components-api/ConfigApi";

export const CHANGE_PASSWORD_CARGANDO = "change_password_cargando";
export const CHANGE_PASSWORD_ERROR = "change_password_error";
export const CHANGE_PASSWORD_HANDLE_CHANGE = "change_password_handle_change";
export const CHANGE_PASSWORD_CLEAN_STATE = "change_password_clean_state";
export const CHANGE_PASSWORD_USER = "change_password_user";
export const CHANGE_PASSWORD_HANDLE_VALIDATION = "change_password_handle_validation";

export const SetPassword = async(data) => {
    const  answer = await axios_api(
        `api/Account/SetPassword`,
        true,
        "post",
        data
      );
    return {res:answer, type:'set_password_put'};
}

import { axios_api } from "../../components-api/ConfigApi";

export const JOB_DETAIL_CARGANDO = "job_detail_cargando";
export const JOB_DETAIL_ERROR = "job_detail_error";
export const JOB_DETAIL_HANDLE_CHANGE = "job_detail_handle_change";
export const JOB_DETAIL_CLEAN_STATE = "job_detail_clean_state";
export const JOB_DETAIL_CRUD = "job_detail_crud";
export const JOB_DETAILS_LIST = "job_detail_list";
export const JOB_DETAIL_HANDLE_VALIDATION = "job_detail_handle_validation";

export const GetJobDetails = async()=> {
    const  answer = await axios_api(
        `api/JobDetails`,
        true,
        "get"
      );
    return {res:answer, type: JOB_DETAILS_LIST};
}

export const GetJobDetailByPersonalDetailId = async(data)=> {
  const  answer = await axios_api(
      `api/JobDetailByPersonalDetailId?personalDetailId=${data.personalDetailId}`,
      true,
      "get"
    );
  return {res:answer, type: JOB_DETAIL_CRUD};
}


export const GetJobDetail = async(data)=> {
    const  answer = await axios_api(
        `api/JobDetail?id=${data.Id}`,
        true,
        "get"
      );
    return {res:answer, type: JOB_DETAIL_CRUD};
}

export const PutJobDetail = async(data)=> {
    const  answer = await axios_api(
        `api/JobDetail?id=${data.Id}`,
        true,
        "put",
        data
      );
    return {res:answer, type: 'job_detail_put'};
}

export const PostJobDetail = async(data)=> {
    const  answer = await axios_api(
        `api/JobDetail`,
        true,
        "post",
        data
      );
    return {res:answer, type: JOB_DETAIL_CRUD};
}

export const DeleteJobDetail = async(data)=> {
    const  answer = await axios_api(
        `api/JobDetail?id=${data.Id}`,
        true,
        "delete"
      );
    return {res:answer, type: JOB_DETAIL_CRUD};
}
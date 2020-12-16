// Imports de axios.
import axios from "axios";

/*
 * Función para detectar el tipo de error.
 */
export const errorResponse = (data) => {
  //debugger;
  if (data.ModelState) {
    return data.ModelState[""];
  }
  if (data.Message) {
    return data.Message;
  }
  if (data.error_description) {
    return data.error_description;
  }
  if (data.error) {
    return data.error;
  }
};

/*
 * F.unción para manejar errores.
 */
export const errorHandler = (error) => {
  let messageError = "";
  //debugger;
  if (!error.response) {
    messageError = "Error de conexión";
  } else {
    switch (error.response.status) {
      case 400:
        messageError = errorResponse(error.response.data);
        break;
      case 404:
        messageError = errorResponse(error.response.data);
        break;
      case 500:
        messageError = errorResponse(error.response.data);
        break;
      case 401:
        setLocalStorage();
        window.open(`https://version4-front.azurewebsites.net/login-expired`, "_self");
        break;
      default:
        messageError = errorResponse(error.response.data);
        break;
    }
  }
  return messageError;
};

/*
 * Funcion para manejar el encabezado del token.
 */
function configHeader(token) {
  if (token) {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    return config;
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return config;
}

/*
 * Función para setear local storage
 */
export const setLocalStorage = (respuesta) => {
  if (respuesta === undefined) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    return;
  }

  localStorage.setItem("token", respuesta.data.access_token);
  localStorage.setItem("role", respuesta.data.roles);
  localStorage.setItem("username", respuesta.data.userName);

  return;
};

/*
 * Función para manejar las peticiones del api, reducir y optimizar código
 * uri: dirección que vamos a llamar del back
 * header: si requiere autenticación el usuario
 * apiMethod: get, post, put, delete
 * body: cuerpo si lo necesita
 */
export const axios_api = async (
  uri = "",
  header,
  apiMethod = "",
  body = {}
) => {
  let respuesta = {};

  if (uri === "") {
    return (respuesta = {
      data: "No se especifico ninguna uri",
    });
  }

  const config = configHeader(header);

  const pathApi = `${localStorage.getItem("route")}${uri}`;

  switch (apiMethod.toLowerCase()) {
    case "get":
      respuesta = await axios.get(pathApi, config);
      break;
    case "post":
      respuesta = await axios.post(pathApi, body, config);
      break;
    case "put":
      respuesta = await axios.put(pathApi, body, config);
      break;
    case "delete":
      respuesta = await axios.delete(pathApi, config);
      break;
    default:
      respuesta = {
        data: "No se envio ningun ApiMethod",
      };
      break;
  }

  return respuesta;
};

export const signOff = (e) => {
  e.preventDefault();
  setLocalStorage();
  window.open(`https://version4-front.azurewebsites.net`, "_self");
};

// Metodo para manejar las rutas del api
export const setPathApi = () => {
  const option = 2;
  let route = "";
  switch (option) {
    case 1:
      // Local
      route = "https://localhost:44356/";
      break;
    case 2:
      // Develop
      route = "https://version4-back.azurewebsites.net";
      break;
    case 3:
      // Production
      route = "https://version4-back.azurewebsites.net";
      break;
    default:
      // Develop
      route = "https://version4-back.azurewebsites.net";
      break;
  }

  localStorage.setItem("route", route);
}

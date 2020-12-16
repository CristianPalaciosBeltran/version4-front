export const RE_EMAIL = {
    re: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    validMessage: "Email correcto",
    invalidMessage: "El email necesita un @ y un . para ser valido",
  };
  
  export const RE_PASSWORD = {
    re: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/i,
    validMessage: "Contraseña valida",
    invalidMessage:
      "La contraseña debe tener más de 8 caracteres, un dígito, una minúscula y una mayúscula  ",
  };
  
  export const RE_PASSWORD_MATCHES = {
    re: "",
    validMessage: "La Contraseña coincide",
    invalidMessage: "La contraseña no coincide",
  };
  
  export const RE_EMPTY = {
    re: /^[^]+$/i,
    validMessage: "Campo correcto",
    invalidMessage: "No puede ir vacio",
  };
  
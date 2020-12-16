/*
 * Funciones para el manejo de archivos y form datas
 */

export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  let blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

/*
 * creamos un blob
 */
export const createBlob = (dataUri) => {
  let block = dataUri.split(";");
  let contentType = block[0].split(":")[1];
  let realData = block[1].split(",")[1];
  const blob = b64toBlob(realData, contentType);
  return blob;
};

/*
 * Convertimos un blob a form data
 */
export const createFormData = (
  blob,
  BlobTypeId = 1,
  ContainerName = "publicproducts",
  IsPrivate = true,
  UserId = ""
) => {
  const data = new FormData();
  data.set("BlobTypeId", BlobTypeId);
  data.set("ContainerName", ContainerName);
  data.set("IsPrivate", IsPrivate);
  //   if (localStorage.getItem("role") === "Admin") {
  //     data.set("UserId", UserId);
  //   }
  data.append("file", blob);
  return data;
};

function validate(videogame) {
  const patterns = {
    name: {
      pattern: /^\S[a-zA-Z\s]{1,20}\S$/,
      errorMessage: "El nombre de tu videojuego debe ser con letras de A la Z",
    },
    description: {
      pattern: /^[a-zA-ZÀ-ÿ0-9\s]{10,250}$/u,
      errorMessage:
        "Tu descripcion solo puede contener numeros del 1 al 10, letras minimo 10 hasta 250 caracteres",
    },
    image: {
      pattern:
        /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?.*(png|jpg|jpeg|gif)$/,
      errorMessage:
        "Debes insertar una imagen con un enlace seguro (https) y formato jpg, jpeg, png o gift",
    },
    launchDate: {
      pattern: /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/,
      errorMessage: "Debes ingresar el formato correcto de fecha (MM-DD-AAAA)",
    },
    rating: {
      pattern: /^(100(\.1{1,2})?|[1-9]{1,2}(\.\d{1,2})?)$/,
      errorMessage: "El rating debe ser del 0 al 100",
    },
    genres: {
      pattern: /\b\d+\b/,
      errorMessage: "Debes seleccionar al menos un género",
    },
  };

  let errorVideogame = {};

  for (const error in patterns) {
    if (!patterns[error].pattern.test(videogame[error])) {
      errorVideogame[error] = patterns[error].errorMessage;
    }
  }

  return errorVideogame;
}
export default validate;

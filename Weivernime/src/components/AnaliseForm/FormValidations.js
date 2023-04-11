const validations = {
  texto: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite um texto válido",
    },
  },
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}

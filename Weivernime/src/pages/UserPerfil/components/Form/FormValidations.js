const validations = {
  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite um nome válido",
    },
  },
  foto: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Escolha um link de uma foto válido",
    },
  },
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}

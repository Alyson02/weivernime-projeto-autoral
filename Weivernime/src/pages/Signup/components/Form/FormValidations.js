const validations = {
  email: {
    custom: {
      isValid: (value) => isValidEmail(value),
      message: "Digite um email válido",
    },
  },
  password: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite uma senha válida",
    },
    minLength: {
      value: 3,
      message: "A senha deve ter no mínimo 3 caracteres"
    }
  },
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}

function isValidEmail(value) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(value)) return true;

  return false;
}

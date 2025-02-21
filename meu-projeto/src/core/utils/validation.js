// Centralized Validation Utility
export const Validators = {
  required: (value) => !!value || 'Este campo é obrigatório',
  
  minLength: (min) => (value) => 
    (value && value.length >= min) || `Mínimo de ${min} caracteres`,
  
  maxLength: (max) => (value) => 
    (value && value.length <= max) || `Máximo de ${max} caracteres`,
  
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'E-mail inválido';
  },
  
  cpf: (value) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(value) || 'CPF inválido';
  },
  
  combine: (...validators) => (value) => {
    for (let validator of validators) {
      const result = validator(value);
      if (result !== true) return result;
    }
    return true;
  }
};

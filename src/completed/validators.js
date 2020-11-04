export const makeVModelValidator = (validModifiers = []) => {
  return {
    type: Object,
    default: () => ({}),
    validator: (value = {}) => {
      if (Object.keys(value).length === 0) return true;
      return Object.keys(value).find((v) => validModifiers.includes(v)) != null;
    }
  };
};

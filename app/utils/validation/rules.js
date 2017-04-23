export default {
  email: {
    email: true,
    presence: true,
  },
  required: {
    presence: true,
  },
  phone: {
    presence: true,
    length: {
      minimum: 10,
    },
  },
  cvc: {
    presence: true,
    length: {
      minimum: 3,
      maximum: 4,
    },
  },
  greaterThenZero: {
    presence: true,
    numericality: {
      greaterThan: 0,
    },
  },
  equalsTo: (field) => ({ equality: field }),
};

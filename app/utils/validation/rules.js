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
  equalsTo: (field) => ({ equality: field }),
};

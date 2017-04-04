export default {
  email: {
    email: true,
    presence: true,
  },
  required: {
    presence: true,
  },
  equalsTo: (field) => ({ equality: field }),
};

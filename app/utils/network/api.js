import { withBasePath } from './request';
import { post } from './methods';
const host = withBasePath('http://api.dev-soaspay.com:8080');

export default {
  user: {
    login: post(host('/auth/sign-in/')),
    signUp: post(host('/auth/sign-up/')),
    forgotPassword: post(host('/auth/forgot/')),
    changePassword: post(host('/auth/set-password/')),
    register: post(host('/profile/registration-form/')),
  },
};

import { withBasePath } from './request';
import { post, get } from './methods';
const host = withBasePath('http://api.dev-soaspay.com:8080');

export default {
  user: {
    login: post(host('/auth/sign-in/')),
    signUp: post(host('/auth/sign-up/')),
    forgotPassword: post(host('/auth/forgot/')),
    changePassword: post(host('/auth/set-password/')),
    register: post(host('/profile/registration-form/')),
    profile: post(host('/profile')),
    checkProfile: post(host('/profile/check/')),
  },
  transactions: {
    create: post(host('/transaction/create/')),
    createByGIRO: post(host('/transaction/create/giro')),
    topUp: post(host('/transaction/topup/')),
    topUpByGIRO: post(host('/transaction/topup/giro')),
  },
  events: {
    news: get(host('/profile/news/')),
  },
  invoices: {
    get: get(host('/invoice/get/:id')),
    create: post(host('/invoice/create/')),
  }
};

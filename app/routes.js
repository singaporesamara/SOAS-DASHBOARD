// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';
import { ROUTES } from './constants/routes';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: ROUTES.INDEX,
      name: 'home',
      getComponent(nextState, cb) {
        import('containers/HomePage').then(loadModule(cb)).catch(errorLoading);
      },
    }, {
      path: ROUTES.USER.LOGIN,
      name: 'login',
      getComponent(nextState, cb) {
        import('containers/User/LoginPage').then(loadModule(cb)).catch(errorLoading);
      },
    }, {
      path: ROUTES.USER.SIGN_UP,
      name: 'sign-up',
      getComponent(nextState, cb) {
        import('containers/User/SignUpPage').then(loadModule(cb)).catch(errorLoading);
      },
    }, {
      path: ROUTES.USER.FORGOT_PASSWORD,
      name: 'forgot-password',
      getComponent(nextState, cb) {
        import('containers/User/ForgotPasswordPage').then(loadModule(cb)).catch(errorLoading);
      },
    }, {
      path: ROUTES.USER.CHANGE_PASSWORD,
      name: 'change-password',
      getComponent(nextState, cb) {
        import('containers/User/ChangePasswordPage').then(loadModule(cb)).catch(errorLoading);
      },
    }, {
      path: ROUTES.USER.REGISTRATION,
      name: 'registration',
      getComponent(nextState, cb) {
        import('containers/User/RegistrationPage').then(loadModule(cb)).catch(errorLoading);
      },
    }, {
      path: ROUTES.APP.HOME,
      name: 'application',
      getComponent(nextState, cb) {
        import('containers/Application/HomePage').then(loadModule(cb)).catch(errorLoading);
      },
    }, {
      path: ROUTES.APP.INVOICES.CREATE,
      name: 'applicationCreateInvoice',
      getComponent(nextState, cb) {
        import('containers/Application/Invoices/CreateInvoicePage').then(loadModule(cb)).catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}

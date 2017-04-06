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
  // loads page with sagas
  const loadPage = (resources, nextState, cb) => {
    const importModules = Promise.all(resources);
    const renderRoute = loadModule(cb);
    importModules.then(([sagas, component]) => {
      injectSagas(sagas.default);
      renderRoute(component);
    }).catch(errorLoading);
  };

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: ROUTES.USER.LOGIN,
      name: 'login',
      getComponent(nextState, cb) {
        loadPage([
          import('containers/User/LoginPage/sagas'),
          import('containers/User/LoginPage'),
        ], nextState, cb);
      },
    }, {
      path: ROUTES.USER.SIGN_UP,
      name: 'sign-up',
      getComponent(nextState, cb) {
        loadPage([
          import('containers/User/SignUpPage/sagas'),
          import('containers/User/SignUpPage'),
        ], nextState, cb);
      },
    }, {
      path: ROUTES.USER.FORGOT_PASSWORD,
      name: 'forgot-password',
      getComponent(nextState, cb) {
        loadPage([
          import('containers/User/ForgotPasswordPage/sagas'),
          import('containers/User/ForgotPasswordPage'),
        ], nextState, cb);
      },
    }, {
      path: ROUTES.USER.CHANGE_PASSWORD,
      name: 'change-password',
      getComponent(nextState, cb) {
        loadPage([
          import('containers/User/ChangePasswordPage/sagas'),
          import('containers/User/ChangePasswordPage'),
        ], nextState, cb);
      },
    }, {
      path: ROUTES.USER.REGISTRATION,
      name: 'registration',
      getComponent(nextState, cb) {
        loadPage([
          import('containers/User/RegistrationPage/sagas'),
          import('containers/User/RegistrationPage'),
        ], nextState, cb);
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

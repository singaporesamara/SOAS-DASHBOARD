import loginSaga from '../containers/User/LoginPage/sagas';
import signUpSaga from '../containers/User/SignUpPage/sagas';
import forgotPasswordSaga from '../containers/User/ForgotPasswordPage/sagas';
import changePasswordSaga from '../containers/User/ChangePasswordPage/sagas';
import registrationSaga from '../containers/User/RegistrationPage/sagas';
import applicationHomeSaga from '../containers/Application/HomePage/sagas';

import formSaga from './common/form';
import userSaga from './common/user';

const addSagas = (store) => {
  const allSagas = [formSaga, userSaga, loginSaga, signUpSaga, forgotPasswordSaga, changePasswordSaga, registrationSaga, applicationHomeSaga];

  allSagas.forEach((sagas) => {
    sagas.forEach((saga) => {
      store.runSaga(saga);
    });
  });
};

export default addSagas;

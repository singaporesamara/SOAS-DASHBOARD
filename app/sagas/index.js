// pages
import loginSaga from '../containers/User/LoginPage/sagas';
import signUpSaga from '../containers/User/SignUpPage/sagas';
import forgotPasswordSaga from '../containers/User/ForgotPasswordPage/sagas';
import changePasswordSaga from '../containers/User/ChangePasswordPage/sagas';
import registrationSaga from '../containers/User/RegistrationPage/sagas';
import applicationHomeSaga from '../containers/Application/HomePage/sagas';
import homeSaga from '../containers/HomePage/sagas';

// widgets
import eWalletCreditCardSaga from '../components/Widgets/EWallet/CreditCard/sagas';

// common
import formSaga from './common/form';
import userSaga from './common/user';

const addSagas = (store) => {
  const allSagas = [formSaga, userSaga, loginSaga, signUpSaga, forgotPasswordSaga, changePasswordSaga, registrationSaga, applicationHomeSaga, homeSaga, eWalletCreditCardSaga];

  allSagas.forEach((sagas) => {
    sagas.forEach((saga) => {
      store.runSaga(saga);
    });
  });
};

export default addSagas;

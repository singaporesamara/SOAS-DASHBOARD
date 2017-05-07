// pages
import loginSaga from '../containers/User/LoginPage/sagas';
import signUpSaga from '../containers/User/SignUpPage/sagas';
import forgotPasswordSaga from '../containers/User/ForgotPasswordPage/sagas';
import changePasswordSaga from '../containers/User/ChangePasswordPage/sagas';
import registrationSaga from '../containers/User/RegistrationPage/sagas';
import applicationHomeSaga from '../containers/Application/HomePage/sagas';
import homeSaga from '../containers/HomePage/sagas';

// widgets
import eWalletCreditCardSaga from '../components/Widgets/EWallet/Forms/CreditCard/sagas';
import eWalletCreateTransactionFormSaga from '../components/Widgets/EWallet/Forms/CreateTransaction/sagas';
import eWalletCreateGIROTransactionFormSaga from '../components/Widgets/EWallet/Forms/CreateGIROTransaction/sagas';
import eWalletTopUpGIROFormSaga from '../components/Widgets/EWallet/Forms/TopUpGIRO/sagas';

// common
import formSaga from './common/form';
import userSaga from './common/user';
import eventsSaga from './common/events';

const addSagas = (store) => {
  const allSagas = [formSaga, userSaga, loginSaga, signUpSaga, forgotPasswordSaga, changePasswordSaga, registrationSaga, applicationHomeSaga, homeSaga, eWalletCreditCardSaga, eWalletCreateTransactionFormSaga, eventsSaga, eWalletTopUpGIROFormSaga, eWalletCreateGIROTransactionFormSaga];

  allSagas.forEach((sagas) => {
    sagas.forEach((saga) => {
      store.runSaga(saga);
    });
  });
};

export default addSagas;

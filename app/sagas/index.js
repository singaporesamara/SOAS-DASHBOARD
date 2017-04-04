import formSaga from './common/form';

const addSagas = (store) => {
  const allSagas = [formSaga];

  allSagas.forEach((sagas) => {
    sagas.forEach((saga) => {
      store.runSaga(saga);
    });
  });
};

export default addSagas;

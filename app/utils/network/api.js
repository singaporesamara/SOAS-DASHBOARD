import { get, post, put, destroy } from './methods';

export default {
  orders: {
    find: get('/api/techs/orders/:token'),
    markContacted: post('/api/techs/orders/:token/mark_contacted'),
    enRoute: post('/api/techs/orders/:token/en_route'),
    startJob: post('/api/techs/orders/:token/start'),
    pauseJob: post('/api/techs/orders/:token/pause'),
    resumeJob: post('/api/techs/orders/:token/resume'),
    cancel: post('/api/techs/orders/:token/cancel'),
    claim: post('/api/techs/orders/:token/claim'),
    claimInfo: get('/api/techs/orders/:token/claim'),
    updateAppointment: post('/api/techs/orders/:token/update_appointment'),
    additionalInformationAnswerChanged: post('/api/techs/orders/:token/additional_information_changed'),
    addNote: post('/api/techs/orders/:token/add_order_note'),
    history: {
      byDate: get('/api/techs/orders/history/'),
      breakdown: get('/api/techs/orders/breakdown/history'),
    },
    active: {
      byDate: get('/api/techs/orders/active/'),
      breakdown: get('/api/techs/orders/breakdown/active/'),
    },
    services: {
      find: get('/api/techs/orders/:token/services/:serviceId'),
      update_duration: put('/api/techs/orders/:token/services/:serviceId/update_duration'),
      questions: {
        update: put('/api/techs/orders/:token/services/:serviceId/pre_questions/:questionId'),
      },
    },
  },
  notices: {
    all: get('/api/techs/notices'),
    clear: post('/api/techs/notices/clear'),
  },
  session: {
    current: get('/api/techs/geeks/current.json'),
    destroy: destroy('/logout.json'),
  },
  profile: {
    find: get('/api/techs/geeks/profile'),
    suspendOffers: post('/api/techs/geeks/suspend_offers'),
    paymentsHistory: {
      byDate: get('/api/techs/geeks/payments_history'),
      breakdown: get('/api/techs/geeks/payments_breakdown'),
    },
    updateRadius: put('/api/techs/geeks/update_travel_distance'),
  },
};

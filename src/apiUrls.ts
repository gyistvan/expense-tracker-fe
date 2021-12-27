import { environment } from './environments/environment';

export const apiUrls = {
  TRANSACTIONS: {
    GET_ALL: '/api/transactions',
    ADD_NEW: '/api/transactions',
  },
  TRANSACTION: {
    GET: '/api/transactionById/',
    DELETE: '/api/transactionById/',
    UPDATE: '/api/transactionById/',
  },
  INCOMES: {
    ADD_NEW: '/api/incomes',
    GET_ALL: '/api/incomes',
  },
  INCOME: {
    DELETE: '/api/incomeById/',
    GET: '/api/incomeById/',
    UPDATE: '/api/incomeById/',
  },
  APP_STATE: {
    GET: '/api/saving',
    ADD: '/api/saving',
  },
  AUTH: {
    LOGIN: '/api/login',
    LOGOUT: '/api/logout',
    REGISTER: '/api/register',
  },
  USER: {
    ME: '/api/me',
    UPDATE_PASSWORD: '/api/updatePassword',
    UPDATE_PROFILE: '/api/me',
  },
  GROUP: {
    GET: '/api/group/',
    CREATE: '/api/group',
    INVITE_PREFIX: '/api/group/',
    INVITE_SUFFIX: '/invite',
  },
};

export const BASE_URL = environment.production
  ? 'https://expense-tracker-be-node-mongo.herokuapp.com'
  : 'http://localhost:4200';

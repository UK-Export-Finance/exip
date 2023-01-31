const INSURANCE_ROOT = '/insurance';
const CREATE_ROOT = '/create-account';

const CREATE = {
  ROOT: CREATE_ROOT,
  YOUR_DETAILS: `${INSURANCE_ROOT}${CREATE_ROOT}/your-details`,
  CONFIRM_EMAIL: `${INSURANCE_ROOT}${CREATE_ROOT}/confirm-email`,
};

const SIGN_IN = {
  ROOT: `${INSURANCE_ROOT}/sign-in`,
};

export const ACCOUNT = {
  CREATE,
  SIGN_IN,
};

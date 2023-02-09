const INSURANCE_ROOT = '/insurance';
const CREATE_ROOT = '/create-account';
const SIGN_IN_ROOT = '/sign-in';
const RESET_PASSWORD_ROOT = '/password-reset';

const CREATE = {
  ROOT: CREATE_ROOT,
  YOUR_DETAILS: `${INSURANCE_ROOT}${CREATE_ROOT}/your-details`,
  CONFIRM_EMAIL: `${INSURANCE_ROOT}${CREATE_ROOT}/confirm-email`,
};

const SIGN_IN = {
  ROOT: `${INSURANCE_ROOT}${SIGN_IN_ROOT}`,
  ENTER_CODE: `${INSURANCE_ROOT}${SIGN_IN_ROOT}/enter-code`,
};

const RESET_PASSWORD = {
  ROOT: `${INSURANCE_ROOT}${RESET_PASSWORD_ROOT}`,
};

export const ACCOUNT = {
  CREATE,
  SIGN_IN,
  RESET_PASSWORD,
};

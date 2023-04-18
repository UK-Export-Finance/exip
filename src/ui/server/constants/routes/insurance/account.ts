const INSURANCE_ROOT = '/insurance';
const CREATE_ROOT = '/create-account';
const SIGN_IN_ROOT = '/sign-in';
const PASSWORD_RESET_ROOT = '/password-reset';

const CREATE = {
  ROOT: CREATE_ROOT,
  YOUR_DETAILS: `${INSURANCE_ROOT}${CREATE_ROOT}/your-details`,
  CONFIRM_EMAIL: `${INSURANCE_ROOT}${CREATE_ROOT}/confirm-email`,
  CONFIRM_EMAIL_RESENT: `${INSURANCE_ROOT}${CREATE_ROOT}/confirm-email-resent`,
  VERIFY_EMAIL: `${INSURANCE_ROOT}${CREATE_ROOT}/verify-email`,
  VERIFY_EMAIL_LINK_EXPIRED: `${INSURANCE_ROOT}${CREATE_ROOT}/link-expired`,
};

const SIGN_IN = {
  ROOT: `${INSURANCE_ROOT}${SIGN_IN_ROOT}`,
  ENTER_CODE: `${INSURANCE_ROOT}${SIGN_IN_ROOT}/enter-code`,
  REQUEST_NEW_CODE: `${INSURANCE_ROOT}${SIGN_IN_ROOT}/request-new-code`,
};

const MANAGE_ACCOUNT = `${INSURANCE_ROOT}/manage-account`;

const PASSWORD_RESET = {
  ROOT: `${INSURANCE_ROOT}${PASSWORD_RESET_ROOT}`,
  LINK_SENT: `${INSURANCE_ROOT}/link-sent`,
};

const SIGN_OUT = `${INSURANCE_ROOT}/sign-out`;

const SIGNED_OUT = `${INSURANCE_ROOT}/signed-out`;

export const ACCOUNT = {
  CREATE,
  SIGN_IN,
  MANAGE_ACCOUNT,
  PASSWORD_RESET,
  SIGN_OUT,
  SIGNED_OUT,
};

const INSURANCE_ROOT = '/insurance';
const CREATE_ROOT = '/create-account';
const SIGN_IN_ROOT = '/sign-in';
const PASSWORD_RESET_ROOT = '/password-reset';
const SUSPENDED_ROOT = `${INSURANCE_ROOT}/account-suspended`;

const CREATE = {
  ROOT: CREATE_ROOT,
  YOUR_DETAILS: `${INSURANCE_ROOT}${CREATE_ROOT}/your-details`,
  CONFIRM_EMAIL: `${INSURANCE_ROOT}${CREATE_ROOT}/confirm-email`,
  RESEND_CONFIRM_EMAIL: `${INSURANCE_ROOT}${CREATE_ROOT}/resend-confirm-email`,
  CONFIRM_EMAIL_RESENT: `${INSURANCE_ROOT}${CREATE_ROOT}/confirm-email-resent`,
  VERIFY_EMAIL: `${INSURANCE_ROOT}${CREATE_ROOT}/verify-email`,
  VERIFY_EMAIL_LINK_EXPIRED: `${INSURANCE_ROOT}${CREATE_ROOT}/link-expired`,
};

const SIGN_IN = {
  ROOT: `${INSURANCE_ROOT}${SIGN_IN_ROOT}`,
  ENTER_CODE: `${INSURANCE_ROOT}${SIGN_IN_ROOT}/enter-code`,
  REQUEST_NEW_CODE: `${INSURANCE_ROOT}${SIGN_IN_ROOT}/request-new-code`,
};

const MANAGE = `${INSURANCE_ROOT}/manage-account`;

const PASSWORD_RESET = {
  ROOT: `${INSURANCE_ROOT}${PASSWORD_RESET_ROOT}`,
  LINK_SENT: `${INSURANCE_ROOT}${PASSWORD_RESET_ROOT}/link-sent`,
  LINK_EXPIRED: `${INSURANCE_ROOT}${PASSWORD_RESET_ROOT}/link-expired`,
  NEW_PASSWORD: `${INSURANCE_ROOT}${PASSWORD_RESET_ROOT}/new-password`,
  SUCCESS: `${INSURANCE_ROOT}${PASSWORD_RESET_ROOT}/success`,
};

const SIGN_OUT = `${INSURANCE_ROOT}/sign-out`;

const SIGNED_OUT = `${INSURANCE_ROOT}/signed-out`;

const SUSPENDED = {
  ROOT: SUSPENDED_ROOT,
  EMAIL_SENT: `${SUSPENDED_ROOT}/email-sent`,
  VERIFY_EMAIL: `${SUSPENDED_ROOT}/verify-email`,
  VERIFY_EMAIL_LINK_EXPIRED: `${SUSPENDED_ROOT}/link-expired`,
};

const REACTIVATED = `${INSURANCE_ROOT}/account-reactivated`;

export const ACCOUNT = {
  CREATE,
  SIGN_IN,
  MANAGE,
  PASSWORD_RESET,
  SIGN_OUT,
  SIGNED_OUT,
  SUSPENDED,
  REACTIVATED,
};

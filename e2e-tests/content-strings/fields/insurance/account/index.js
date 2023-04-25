import { FIELD_IDS } from '../../../../constants';

const { ACCOUNT } = FIELD_IDS.INSURANCE;
const {
  FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, SECURITY_CODE,
} = ACCOUNT;

export const ACCOUNT_FIELDS = {
  [EMAIL]: {
    LABEL: 'Email address',
  },
  [PASSWORD]: {
    REVEAL: {
      SHOW: 'Show',
      HIDE: 'Hide',
    },
  },
  [SECURITY_CODE]: {
    LABEL: 'Security code',
  },
  CREATE: {
    YOUR_DETAILS: {
      [FIRST_NAME]: {
        LABEL: 'First name',
      },
      [LAST_NAME]: {
        LABEL: 'Last name',
      },
      [PASSWORD]: {
        LABEL: 'Create a password',
        HINT: {
          INTRO: 'Your password must contain at least 14 characters and have:',
          RULES: [
            'an uppercase letter',
            'a lowercase letter',
            'a number',
            'a special character',
          ],
        },
      },
    },
  },
  SIGN_IN: {
    [PASSWORD]: {
      LABEL: 'Password',
    },
  },
  PASSWORD_RESET: {
    [EMAIL]: {
      LABEL: 'Email address',
      HINT: 'Enter the email address you used to create your account.',
    },
  },
};

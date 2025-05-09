import { FIELD_IDS } from '../../../../constants';
import { ObjectType } from '../../../../../types/object';

const { ACCOUNT } = FIELD_IDS.INSURANCE;
const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, ACCESS_CODE } = ACCOUNT;

const PASSWORD_HINT = {
  INTRO: 'Your password must contain at least 14 characters and have:',
  RULES: ['an uppercase letter', 'a lowercase letter', 'a number', 'a special character (for example @%!?*)'],
} as const;

export const ACCOUNT_FIELDS: ObjectType = {
  [FIRST_NAME]: {
    LABEL: 'First name',
  },
  [LAST_NAME]: {
    LABEL: 'Last name',
  },
  [EMAIL]: {
    LABEL: 'Email address',
  },
  [PASSWORD]: {
    REVEAL: {
      SHOW: 'Show',
      HIDE: 'Hide',
    },
  },
  [ACCESS_CODE]: {
    LABEL: 'Access code',
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
        HINT: PASSWORD_HINT,
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
      HINT: 'Enter the email address associated with your credit insurance application(s).',
    },
  },
  NEW_PASSWORD: {
    [PASSWORD]: {
      LABEL: 'Create a password',
      HINT: PASSWORD_HINT,
    },
  },
};

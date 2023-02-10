import { FIELD_IDS } from '../../../../constants';

const { ACCOUNT } = FIELD_IDS.INSURANCE;
const {
  FIRST_NAME, LAST_NAME, EMAIL, PASSWORD,
} = ACCOUNT;

export const ACCOUNT_FIELDS = {
  [EMAIL]: {
    LABEL: 'Email address',
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
        REVEAL: {
          SHOW: 'Show',
          HIDE: 'Hide',
        },
      },
    },
  },
  SIGN_IN: {
    [PASSWORD]: {
      LABEL: 'Password',
    },
  },
};

import { FIELD_IDS } from '../../../../constants';

const { ACCOUNT } = FIELD_IDS.INSURANCE;
const { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD } = ACCOUNT;

export const ACCOUNT_FIELDS = {
  CREATE: {
    YOUR_DETAILS: {
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
        LABEL: 'Create a password',
      },
    },
  },
};

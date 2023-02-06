import { FIELD_IDS } from '../../constants';

const {
  INSURANCE: {
    ACCOUNT: {
      FIRST_NAME, LAST_NAME, EMAIL, PASSWORD,
    },
  },
} = FIELD_IDS;

const account = {
  [FIRST_NAME]: 'Joe',
  [LAST_NAME]: 'Bloggs',
  [EMAIL]: Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT'),
  [PASSWORD]: 'Mockpassword1!',
};

export default account;

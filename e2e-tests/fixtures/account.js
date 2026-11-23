import { FIELD_IDS } from '../constants';

const {
  INSURANCE: {
    ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD },
  },
} = FIELD_IDS;

const account = {
  [FIRST_NAME]: 'Joe',
  [LAST_NAME]: 'Bloggs',
  [EMAIL]: Cypress.expose('GOV_NOTIFY_EMAIL_RECIPIENT_1'),
  [PASSWORD]: Cypress.config('mockAccountPassword'),
};

export default account;

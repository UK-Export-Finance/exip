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
  // [EMAIL]: 'mock@email.com',
  [EMAIL]: 'Tony.Barnes@ukexportfinance.gov.uk',
  [PASSWORD]: 'Mockpassword1!',
};

export default account;

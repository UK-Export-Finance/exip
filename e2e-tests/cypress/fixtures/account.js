import { FIELD_IDS } from '../../constants';

const {
  INSURANCE: {
    ACCOUNT: { FIRST_NAME, LAST_NAME },
  },
} = FIELD_IDS;

const account = {
  [FIRST_NAME]: 'Joe',
  [LAST_NAME]: 'Bloggs',
};

export default account;

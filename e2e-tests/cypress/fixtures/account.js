import { FIELD_IDS } from '../../constants';

const {
  INSURANCE: {
    ACCOUNT: { FIRST_NAME },
  },
} = FIELD_IDS;

const account = {
  [FIRST_NAME]: 'Joe',
};

export default account;

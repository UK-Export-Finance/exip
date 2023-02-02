import { submitButton } from '../../../e2e/pages/shared';
import { yourDetailsPage } from '../../../e2e/pages/insurance/account/create';
import { INSURANCE_FIELD_IDS } from '../../../../constants/field-ids/insurance';
import account from '../../../fixtures/account';

const {
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PASSWORD,
  },
} = INSURANCE_FIELD_IDS;

export default () => {
  yourDetailsPage[FIRST_NAME].input().type(account[FIRST_NAME], { delay: 0 });
  yourDetailsPage[LAST_NAME].input().type(account[LAST_NAME], { delay: 0 });
  yourDetailsPage[EMAIL].input().type(account[EMAIL], { delay: 0 });
  yourDetailsPage[PASSWORD].input().type(account[PASSWORD], { delay: 0 });

  submitButton().click();
};

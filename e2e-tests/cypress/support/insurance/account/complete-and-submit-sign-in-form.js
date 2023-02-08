import { submitButton } from '../../../e2e/pages/shared';
import accountFormFields from '../../../e2e/partials/insurance/accountFormFields';
import { INSURANCE_FIELD_IDS } from '../../../../constants/field-ids/insurance';
import account from '../../../fixtures/account';

const {
  ACCOUNT: {
    EMAIL,
    PASSWORD,
  },
} = INSURANCE_FIELD_IDS;

export default () => {
  accountFormFields[EMAIL].input().type(account[EMAIL], { delay: 0 });
  accountFormFields[PASSWORD].input().type(account[PASSWORD], { delay: 0 });

  submitButton().click();
};

import { submitButton } from '../../../pages/shared';
import { yourDetailsPage } from '../../../pages/insurance/account/create';
import accountFormFields from '../../../partials/insurance/accountFormFields';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import account from '../../../fixtures/account';

const {
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PASSWORD,
  },
} = INSURANCE_FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: { YOUR_DETAILS },
  },
} = INSURANCE_ROUTES;

export default (params) => {
  if (params?.navigateToAccountCreationPage) {
    cy.navigateToUrl(YOUR_DETAILS);
  }

  cy.keyboardInput(yourDetailsPage[FIRST_NAME].input(), account[FIRST_NAME]);
  cy.keyboardInput(yourDetailsPage[LAST_NAME].input(), account[LAST_NAME]);
  cy.keyboardInput(accountFormFields[EMAIL].input(), account[EMAIL]);
  cy.keyboardInput(accountFormFields[PASSWORD].input(), account[PASSWORD]);

  submitButton().click();
};

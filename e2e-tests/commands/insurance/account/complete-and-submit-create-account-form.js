import { field } from '../../../pages/shared';
import passwordField from '../../../partials/insurance/passwordField';
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

const completeAndSubmitCreateAccountForm = (params) => {
  if (params?.navigateToAccountCreationPage) {
    cy.navigateToUrl(YOUR_DETAILS);
  }

  cy.keyboardInput(field(FIRST_NAME).input(), account[FIRST_NAME]);
  cy.keyboardInput(field(LAST_NAME).input(), account[LAST_NAME]);
  cy.keyboardInput(field(EMAIL).input(), account[EMAIL]);

  const passwordValue = (params && params[PASSWORD]) || account[PASSWORD];

  cy.keyboardInput(passwordField.input(), passwordValue);

  cy.clickSubmitButton();
};

export default completeAndSubmitCreateAccountForm;

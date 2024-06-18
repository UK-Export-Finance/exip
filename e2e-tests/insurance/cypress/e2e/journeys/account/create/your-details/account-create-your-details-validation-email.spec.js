import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { assertEmailFieldValidation } from '../../../../../../../shared-test-assertions';

const {
  START,
  ACCOUNT: { CREATE: { YOUR_DETAILS } },
} = ROUTES;

const {
  ACCOUNT: { EMAIL: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: {
        YOUR_DETAILS: {
          [FIELD_ID]: ERROR_MESSAGES_OBJECT,
        },
      },
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Create - Your details page - form validation - email', () => {
  let url;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();

    url = `${baseUrl}${YOUR_DETAILS}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  assertEmailFieldValidation({
    fieldId: FIELD_ID,
    errorIndex: 2,
    errorMessages: ERROR_MESSAGES_OBJECT,
    totalExpectedErrors: 4,
    totalExpectedOtherErrorsWithValidEmail: 3,
  });
});

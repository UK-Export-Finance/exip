import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { assertEmailFieldValidation } from '../../../../../../../shared-test-assertions';

const {
  COMPANY_OR_ORGANISATION: {
    EMAIL: FIELD_ID,
  },
} = FIELD_IDS;

const {
  ROOT: INSURANCE_ROOT,
  YOUR_BUYER: { COMPANY_OR_ORGANISATION },
} = INSURANCE_ROUTES;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: {
        [FIELD_ID]: ERROR_MESSAGES_OBJECT,
      },
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your Buyer - Company or organisation page - form validation - email', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  assertEmailFieldValidation({
    fieldId: FIELD_ID,
    errorIndex: 5,
    errorMessages: ERROR_MESSAGES_OBJECT,
    totalExpectedErrors: 7,
    totalExpectedOtherErrorsWithValidEmail: 6,
  });
});

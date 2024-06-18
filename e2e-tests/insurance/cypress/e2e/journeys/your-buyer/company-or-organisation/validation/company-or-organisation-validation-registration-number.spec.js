import { field as fieldSelector } from '../../../../../../../pages/shared';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';

const {
  COMPANY_OR_ORGANISATION: {
    REGISTRATION_NUMBER: FIELD_ID,
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: COMPANY_OR_ORG_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const {
  ROOT: INSURANCE_ROOT,
  YOUR_BUYER: { COMPANY_OR_ORGANISATION },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Company or organisation page - form validation - registration number', () => {
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

  it('should render a validation error and retain the submitted value when address is above the maximum', () => {
    cy.submitAndAssertFieldErrors({
      field: fieldSelector(FIELD_ID),
      value: 'a'.repeat(MAXIMUM_CHARACTERS.BUYER.REGISTRATION_NUMBER + 1),
      errorIndex: 2,
      expectedErrorsCount: 3,
      expectedErrorMessage: COMPANY_OR_ORG_ERROR_MESSAGES[FIELD_ID].ABOVE_MAXIMUM,
    });
  });
});

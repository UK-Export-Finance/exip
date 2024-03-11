import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';

const {
  COMPANY_OR_ORGANISATION: {
    ADDRESS,
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

context('Insurance - Your Buyer - Company or organisation page - form validation - address', () => {
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

  const field = fieldSelector(ADDRESS);
  const submittedValue = 'a'.repeat(1001);

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should render a validation error and retain the submitted value when address is above the maximum', () => {
    const expectedErrorsCount = 2;
    const errorIndex = 1;

    cy.submitAndAssertFieldErrors(
      field,
      submittedValue,
      errorIndex,
      expectedErrorsCount,
      COMPANY_OR_ORG_ERROR_MESSAGES[ADDRESS].ABOVE_MAXIMUM,
    );
  });
});

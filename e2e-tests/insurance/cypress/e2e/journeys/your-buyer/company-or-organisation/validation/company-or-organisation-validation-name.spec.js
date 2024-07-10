import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants/validation';

const {
  COMPANY_OR_ORGANISATION: { NAME: FIELD_ID },
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

context('Insurance - Your buyer - Company or organisation page - form validation - company or organisation name', () => {
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

  describe(`when ${FIELD_ID} is over ${MAXIMUM_CHARACTERS.BUYER.COMPANY_OR_ORGANISATION} characters`, () => {
    it('should display validation errors and retain the submitted value', () => {
      const submittedValue = 'a'.repeat(MAXIMUM_CHARACTERS.BUYER.COMPANY_OR_ORGANISATION + 1);

      cy.submitAndAssertFieldErrors({
        field: fieldSelector(FIELD_ID),
        expectedErrorMessage: COMPANY_OR_ORG_ERROR_MESSAGES[FIELD_ID].ABOVE_MAXIMUM,
        value: submittedValue,
        expectedErrorsCount: 2,
      });
    });
  });
});

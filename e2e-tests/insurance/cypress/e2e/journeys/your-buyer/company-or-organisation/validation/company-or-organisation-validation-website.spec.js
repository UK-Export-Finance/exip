import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES, WEBSITE_EXAMPLES } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';

const {
  COMPANY_OR_ORGANISATION: {
    WEBSITE: FIELD_ID,
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: COMPANY_OR_ORG_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const ERROR_MESSAGE = COMPANY_OR_ORG_ERROR_MESSAGES[FIELD_ID];

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Company or organisation page - form validation - website', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`;

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

  const assertions = {
    field: fieldSelector(FIELD_ID),
    errorIndex: 2,
    expectedErrorsCount: 3,
  };

  it(`should display validation errors if when ${FIELD_ID} is the incorrect format`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: WEBSITE_EXAMPLES.INVALID,
      expectedErrorMessage: ERROR_MESSAGE.INCORRECT_FORMAT,
    });
  });

  it(`should display validation errors when ${FIELD_ID} is above 191 characters`, () => {
    cy.submitAndAssertFieldErrors({
      ...assertions,
      value: WEBSITE_EXAMPLES.ABOVE_MAX_LENGTH,
      expectedErrorMessage: ERROR_MESSAGE.INCORRECT_FORMAT,
    });
  });

  describe(`when ${FIELD_ID} is correctly entered`, () => {
    it('should not display validation errors', () => {
      cy.keyboardInput(fieldSelector(FIELD_ID).input(), WEBSITE_EXAMPLES.VALID);

      cy.clickSubmitButton();

      cy.assertErrorSummaryListLength(2);
    });
  });
});

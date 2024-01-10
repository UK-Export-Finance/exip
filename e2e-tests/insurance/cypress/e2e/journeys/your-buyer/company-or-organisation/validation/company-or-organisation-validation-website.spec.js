import { field as fieldSelector } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
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

context('Insurance - Your Buyer - Company or organisation page - form validation - website', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`;

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

  // for error assertion - common fields
  const ERROR_ASSERTIONS = {
    field: fieldSelector(FIELD_ID),
    numberOfExpectedErrors: 8,
    errorIndex: 2,
  };

  it(`should display validation errors if when ${FIELD_ID} is the incorrect format`, () => {
    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
    const value = WEBSITE_EXAMPLES.INVALID;

    const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

    cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it(`should display validation errors when ${FIELD_ID} is above 191 characters`, () => {
    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
    const value = WEBSITE_EXAMPLES.ABOVE_MAX_LENGTH;

    const errorMessage = ERROR_MESSAGE.INCORRECT_FORMAT;

    cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  describe(`when ${FIELD_ID} is correctly entered`, () => {
    it('should not display validation errors', () => {
      cy.keyboardInput(fieldSelector(FIELD_ID).input(), WEBSITE_EXAMPLES.VALID);

      cy.clickSubmitButton();

      partials.errorSummaryListItems().should('have.length', 7);
    });
  });
});

import { field as fieldSelector, submitButton } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';

const {
  COMPANY_OR_ORGANISATION: {
    POSITION: FIELD_ID,
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

context('Insurance - Your Buyer - Company or organisation page - form validation - position', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection();

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

  const ERROR_ASSERTIONS = {
    field: fieldSelector(FIELD_ID),
    numberOfExpectedErrors: 7,
    errorIndex: 4,
  };

  it(`should display validation errors when ${FIELD_ID} is not entered`, () => {
    submitButton().click();

    const errorMessage = ERROR_MESSAGE.IS_EMPTY;

    const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

    cy.submitAndAssertFieldErrors(field, null, errorIndex, numberOfExpectedErrors, errorMessage);
  });

  it(`should NOT display validation errors when ${FIELD_ID} is correctly entered`, () => {
    cy.keyboardInput(fieldSelector(FIELD_ID).input(), application.BUYER[FIELD_ID]);

    submitButton().click();

    partials.errorSummaryListItems().should('have.length', 6);
  });
});

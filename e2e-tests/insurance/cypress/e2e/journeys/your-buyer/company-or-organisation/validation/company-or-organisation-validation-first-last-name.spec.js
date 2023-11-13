import { field as fieldSelector, submitButton } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';

const {
  COMPANY_OR_ORGANISATION: {
    FIRST_NAME: FIRST_NAME_FIELD_ID,
    LAST_NAME: LAST_NAME_FIELD_ID,
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: COMPANY_OR_ORG_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const ERROR_MESSAGE_FIRST_NAME = COMPANY_OR_ORG_ERROR_MESSAGES[FIRST_NAME_FIELD_ID];
const ERROR_MESSAGE_LAST_NAME = COMPANY_OR_ORG_ERROR_MESSAGES[LAST_NAME_FIELD_ID];

context('Insurance - Your Buyer - Company or organisation page - form validation - first and last name', () => {
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
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`${FIRST_NAME_FIELD_ID}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    const ERROR_ASSERTIONS = {
      field: fieldSelector(FIRST_NAME_FIELD_ID),
      numberOfExpectedErrors: 7,
      errorIndex: 2,
    };

    it(`should display validation errors when ${FIRST_NAME_FIELD_ID} is not entered`, () => {
      const errorMessage = ERROR_MESSAGE_FIRST_NAME.IS_EMPTY;

      const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

      cy.submitAndAssertFieldErrors(field, null, errorIndex, numberOfExpectedErrors, errorMessage);
    });

    it(`should NOT display validation errors when ${FIRST_NAME_FIELD_ID} is correctly entered`, () => {
      cy.keyboardInput(fieldSelector(FIRST_NAME_FIELD_ID).input(), application.BUYER[FIRST_NAME_FIELD_ID]);

      submitButton().click();

      partials.errorSummaryListItems().should('have.length', 6);
    });
  });

  describe(`${LAST_NAME_FIELD_ID}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(FIRST_NAME_FIELD_ID).input(), application.BUYER[FIRST_NAME_FIELD_ID]);
    });

    const ERROR_ASSERTIONS = {
      field: fieldSelector(LAST_NAME_FIELD_ID),
      numberOfExpectedErrors: 6,
      errorIndex: 2,
    };

    it(`should display validation errors when ${LAST_NAME_FIELD_ID} is not entered`, () => {
      const errorMessage = ERROR_MESSAGE_LAST_NAME.IS_EMPTY;
      const { numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

      cy.submitAndAssertFieldErrors(fieldSelector(LAST_NAME_FIELD_ID), null, errorIndex, numberOfExpectedErrors, errorMessage);
    });

    it(`should NOT display validation errors when ${LAST_NAME_FIELD_ID} is correctly entered`, () => {
      cy.keyboardInput(fieldSelector(LAST_NAME_FIELD_ID).input(), application.BUYER[LAST_NAME_FIELD_ID]);

      submitButton().click();

      partials.errorSummaryListItems().should('have.length', 5);
    });
  });
});

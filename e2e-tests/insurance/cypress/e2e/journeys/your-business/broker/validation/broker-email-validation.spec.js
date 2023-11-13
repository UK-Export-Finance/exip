import { brokerPage } from '../../../../../../../pages/your-business';
import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/business';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';

const {
  BROKER: {
    USING_BROKER: FIELD_ID,
    EMAIL,
  },
} = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    BROKER,
  },
} = ROUTES.INSURANCE;

const BROKER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const field = brokerPage[FIELD_ID];

const ERROR_ASSERTIONS = {
  errorField: fieldSelector(EMAIL),
  expectedErrorsCount: 5,
  errorIndex: 3,
  errorMessage: BROKER_ERRORS[EMAIL].INCORRECT_FORMAT,
};

context('Insurance - Your business - Broker Page - Validation - Email', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection();

      // TODO - seems this is failing, but not being run in GHA.

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should display validation errors when the email field is left empty', () => {
    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, null, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain an @ symbol', () => {
    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'testemail.com';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain at least one dot', () => {
    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@emailcom';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email contains a space', () => {
    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@email. com';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain a domain', () => {
    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@email.';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });
});

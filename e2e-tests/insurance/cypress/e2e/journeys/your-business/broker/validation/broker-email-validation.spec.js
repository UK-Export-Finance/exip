import { field as fieldSelector, yesRadio } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/business';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';

const {
  BROKER: {
    EMAIL,
  },
} = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    BROKER,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const BROKER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

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

      task.link().click();

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
    yesRadio().label().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, null, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain an @ symbol', () => {
    yesRadio().label().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'testemail.com';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain at least one dot', () => {
    yesRadio().label().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@emailcom';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email contains a space', () => {
    yesRadio().label().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@email. com';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain a domain', () => {
    yesRadio().label().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@email.';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });
});

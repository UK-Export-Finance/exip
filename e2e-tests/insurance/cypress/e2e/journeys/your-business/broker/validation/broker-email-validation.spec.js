import { brokerPage } from '../../../../../../../pages/your-business';
import partials from '../../../../../../../partials';
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

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const BROKER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const ERROR_ASSERTIONS = {
  errorField: brokerPage[EMAIL],
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
    const field = brokerPage[FIELD_ID];

    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, null, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain an @ symbol', () => {
    const field = brokerPage[FIELD_ID];

    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'testemail.com';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain at least one dot', () => {
    const field = brokerPage[FIELD_ID];

    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@emailcom';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email contains a space', () => {
    const field = brokerPage[FIELD_ID];

    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@email. com';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain a domain', () => {
    const field = brokerPage[FIELD_ID];

    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@email.';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });
});

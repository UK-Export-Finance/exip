import { broker } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/exporter-business';
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

const task = taskList.prepareApplication.tasks.exporterBusiness;

const BROKER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const ERROR_ASSERTIONS = {
  errorField: broker[EMAIL],
  expectedErrorsCount: 5,
  errorIndex: 3,
  errorMessage: BROKER_ERRORS[EMAIL].INCORRECT_FORMAT,
};

context('Insurance - Your business - Broker Page - Validation - Email', () => {
  let referenceNumber;
  let url;

  before(() => {
    Cypress.session.clearAllSavedSessions();

    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;
    });
  });

  beforeEach(() => {
    cy.session('mySession', () => {
      cy.signInAndGoToUrl(url);
    });
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  it('should display validation errors when the email field is left empty', () => {
    cy.navigateToUrl(url);

    const field = broker[FIELD_ID];

    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, null, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain an @ symbol', () => {
    cy.navigateToUrl(url);

    const field = broker[FIELD_ID];

    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'testemail.com';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain at least one dot', () => {
    cy.navigateToUrl(url);

    const field = broker[FIELD_ID];

    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@emailcom';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  // WORKS UP TO HERE

  it('should display validation errors when email contains a space', () => {
    cy.navigateToUrl(url);

    const field = broker[FIELD_ID];

    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@email. com';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain a domain', () => {
    cy.navigateToUrl(url);

    const field = broker[FIELD_ID];

    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@email.';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });
});

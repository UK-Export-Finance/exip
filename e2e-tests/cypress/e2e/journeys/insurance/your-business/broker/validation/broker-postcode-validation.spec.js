import { broker } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { submitButton } from '../../../../../pages/shared';
import { ROUTES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/exporter-business';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';

const {
  BROKER: {
    USING_BROKER: FIELD_ID,
    POSTCODE,
  },
} = FIELD_IDS;

const {
  ROOT,
  START,
  EXPORTER_BUSINESS: {
    BROKER,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

const BROKER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const ERROR_ASSERTIONS = {
  errorField: broker[POSTCODE],
  expectedErrorsCount: 5,
  errorIndex: 4,
  errorMessageEmpty: BROKER_ERRORS[POSTCODE].IS_EMPTY,
  errorMessageFormat: BROKER_ERRORS[POSTCODE].INCORRECT_FORMAT,
};

context('Insurance - Your business - Broker Page - Validation - Postcode', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();
    cy.completeAndSubmitNatureOfYourBusiness();
    cy.completeAndSubmitTurnoverForm();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when the postcode field is left empty', () => {
    it('should display validation errors', () => {
      const field = broker[FIELD_ID];

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageEmpty,
      } = ERROR_ASSERTIONS;

      cy.submitAndAssertFieldErrors(errorField, null, errorIndex, expectedErrorsCount, errorMessageEmpty);
    });
  });

  describe('when the postcode has 1 letter in the first part', () => {
    it('should display validation errors', () => {
      const field = broker[FIELD_ID];

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = 'S 2AA';

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });
  });

  describe('when the postcode has no letters in the first part', () => {
    it('should display validation errors', () => {
      const field = broker[FIELD_ID];

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = '22 2AA';

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });
  });

  describe('when the postcode has 2 digits in the second part', () => {
    it('should display validation errors', () => {
      const field = broker[FIELD_ID];

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = 'SW1 22A';

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });
  });

  describe('when the postcode has 3 digits in the second part', () => {
    it('should display validation errors', () => {
      const field = broker[FIELD_ID];

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = 'SW1 222';

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });
  });

  describe('when the postcode has all letters in the second part', () => {
    it('should display validation errors', () => {
      const field = broker[FIELD_ID];

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = 'SW1 AAA';

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });
  });

  describe('when the postcode has more than 7 characters', () => {
    it('should display validation errors', () => {
      const field = broker[FIELD_ID];

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = 'SW1A 2AAA';

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });
  });

  describe('when the postcode has less than 5 characters', () => {
    it('should display validation errors', () => {
      const field = broker[FIELD_ID];

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = 'S 2AA';

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });
  });

  describe('when the postcode has a space', () => {
    it('should not display validation errors', () => {
      const field = broker[FIELD_ID];

      field.yesRadioInput().click();

      broker[POSTCODE].input().clear().type('SW1A 2AA');
      submitButton().click();

      partials.errorSummaryListItems().should('have.length', 4);
    });
  });

  describe('when the postcode does not have a space', () => {
    it('should not display validation errors', () => {
      const field = broker[FIELD_ID];

      field.yesRadioInput().click();

      broker[POSTCODE].input().clear().type('SW1A 2AA');
      submitButton().click();

      partials.errorSummaryListItems().should('have.length', 4);
    });
  });
});

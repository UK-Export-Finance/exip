import { broker } from '../../../../../pages/your-business';
import partials from '../../../../../partials';
import { submitButton } from '../../../../../pages/shared';
import { ROUTES, INVALID_POSTCODES, VALID_POSTCODES } from '../../../../../../../constants';
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
  before(() => {
    cy.completeSignInAndGoToApplication().then((referenceNumber) => {
      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  after(() => {
    cy.deleteAccount();
    // TODO: delete application
  });

  describe('invalid postcodes', () => {
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

        const inputValue = INVALID_POSTCODES.ONE_LETTER_FIRST_PART;

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

        const inputValue = INVALID_POSTCODES.NO_LETTERS_FIRST_PART;

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

        const inputValue = INVALID_POSTCODES.TWO_DIGITS_SECOND_PART;

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

        const inputValue = INVALID_POSTCODES.THREE_DIGITS_SECOND_PART;

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

        const inputValue = INVALID_POSTCODES.ALL_LETTERS_SECOND_PART;

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

        const inputValue = INVALID_POSTCODES.TOO_MANY_CHARACTERS;

        cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
      });
    });

    describe('when the postcode has more than 7 characters without spaces', () => {
      it('should display validation errors', () => {
        const field = broker[FIELD_ID];

        field.yesRadioInput().click();

        const {
          errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
        } = ERROR_ASSERTIONS;

        const inputValue = INVALID_POSTCODES.TOO_MANY_CHARACTERS_WITHOUT_SPACE;

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

        const inputValue = INVALID_POSTCODES.TOO_FEW_CHARACTERS;

        cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
      });
    });

    describe('when the postcode has less than 5 characters without spaces', () => {
      it('should display validation errors', () => {
        const field = broker[FIELD_ID];

        field.yesRadioInput().click();

        const {
          errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
        } = ERROR_ASSERTIONS;

        const inputValue = INVALID_POSTCODES.TOO_FEW_CHARACTERS_WITHOUT_SPACE;

        cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
      });
    });
  });

  describe('valid postcodes', () => {
    describe('when the postcode has a space', () => {
      it('should not display validation errors', () => {
        const field = broker[FIELD_ID];

        field.yesRadioInput().click();

        cy.keyboardInput(broker[POSTCODE].input(), VALID_POSTCODES.WITH_SPACE);
        submitButton().click();

        partials.errorSummaryListItems().should('have.length', 4);
      });
    });

    describe('when the postcode does not have a space', () => {
      it('should not display validation errors', () => {
        const field = broker[FIELD_ID];

        field.yesRadioInput().click();

        cy.keyboardInput(broker[POSTCODE].input(), VALID_POSTCODES.WITHOUT_SPACE);
        submitButton().click();

        partials.errorSummaryListItems().should('have.length', 4);
      });
    });
  });
});

import { brokerPage } from '../../../../../../../pages/your-business';
import partials from '../../../../../../../partials';
import { submitButton } from '../../../../../../../pages/shared';
import { ROUTES, INVALID_POSTCODES, VALID_POSTCODES } from '../../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/business';
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

const task = taskList.prepareApplication.tasks.business;

const BROKER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const ERROR_ASSERTIONS = {
  errorField: brokerPage[POSTCODE],
  expectedErrorsCount: 5,
  errorIndex: 4,
  errorMessageEmpty: BROKER_ERRORS[POSTCODE].IS_EMPTY,
  errorMessageFormat: BROKER_ERRORS[POSTCODE].INCORRECT_FORMAT,
};

context('Insurance - Your business - Broker Page - Validation - Postcode', () => {
  let referenceNumber;
  let url;

  const field = brokerPage[FIELD_ID];

  before(() => {
    Cypress.session.clearAllSavedSessions();

    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber });
      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.session('mySession', () => {
      cy.signInAndGoToUrl(url);
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  context('invalid postcodes', () => {
    it('should display validation errors when the postcode field is left empty', () => {
      cy.navigateToUrl(url);

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageEmpty,
      } = ERROR_ASSERTIONS;

      cy.submitAndAssertFieldErrors(errorField, null, errorIndex, expectedErrorsCount, errorMessageEmpty);
    });

    it('should display validation errors when the postcode has 1 letter in the first part', () => {
      cy.navigateToUrl(url);

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = INVALID_POSTCODES.ONE_LETTER_FIRST_PART;

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });

    it('should display validation errors when the postcode has no letters in the first part', () => {
      cy.navigateToUrl(url);

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = INVALID_POSTCODES.NO_LETTERS_FIRST_PART;

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });

    it('should display validation errors when the postcode has 2 digits in the second part', () => {
      cy.navigateToUrl(url);

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = INVALID_POSTCODES.TWO_DIGITS_SECOND_PART;

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });

    it('should display validation errors when the postcode has 3 digits in the second part', () => {
      cy.navigateToUrl(url);

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = INVALID_POSTCODES.THREE_DIGITS_SECOND_PART;

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });

    it('should display validation errors when the postcode has all letters in the second part', () => {
      cy.navigateToUrl(url);

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = INVALID_POSTCODES.ALL_LETTERS_SECOND_PART;

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });

    it('should display validation errors when the postcode has more than 7 characters', () => {
      cy.navigateToUrl(url);

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = INVALID_POSTCODES.TOO_MANY_CHARACTERS;

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });

    it('should display validation errors when the postcode has more than 7 characters without spaces', () => {
      cy.navigateToUrl(url);

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = INVALID_POSTCODES.TOO_MANY_CHARACTERS_WITHOUT_SPACE;

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });

    it('should display validation errors when the postcode has less than 5 characters', () => {
      cy.navigateToUrl(url);

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = INVALID_POSTCODES.TOO_FEW_CHARACTERS;

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });

    it('should display validation errors when the postcode has less than 5 characters without spaces', () => {
      cy.navigateToUrl(url);

      field.yesRadioInput().click();

      const {
        errorField, errorIndex, expectedErrorsCount, errorMessageFormat,
      } = ERROR_ASSERTIONS;

      const inputValue = INVALID_POSTCODES.TOO_FEW_CHARACTERS_WITHOUT_SPACE;

      cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessageFormat);
    });
  });

  context('valid postcodes', () => {
    it('should not display validation errors when the postcode has a space', () => {
      cy.navigateToUrl(url);

      field.yesRadioInput().click();

      cy.keyboardInput(brokerPage[POSTCODE].input(), VALID_POSTCODES.WITH_SPACE);
      submitButton().click();

      partials.errorSummaryListItems().should('have.length', 4);
    });

    it('should not display validation errors when the postcode does not have a space', () => {
      cy.navigateToUrl(url);

      field.yesRadioInput().click();

      cy.keyboardInput(brokerPage[POSTCODE].input(), VALID_POSTCODES.WITHOUT_SPACE);
      submitButton().click();

      partials.errorSummaryListItems().should('have.length', 4);
    });
  });
});

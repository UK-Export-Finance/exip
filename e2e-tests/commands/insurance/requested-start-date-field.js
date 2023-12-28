import partials from '../../partials';
import { field as fieldSelector, submitButton } from '../../pages/shared';
import { ERROR_MESSAGES } from '../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';

const {
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: CONTRACT_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const field = fieldSelector(REQUESTED_START_DATE);

/**
 * checkValidation
 * Various validation assertions for the "requested start date" field, e.g
 * 1) day.notProvided
 * 2) day.providedWithoutOtherFields
 * 3) day.notANumber
 * 4) notInTheFuture
 * 5) invalidFormat
 * 6) isToday
 * @param {Number} errorSummaryLength: The number of expected errors in the summary list
 */
const checkValidation = ({ errorSummaryLength }) => {
  const assertFieldErrorsParams = {
    field,
    errorIndex: 0,
    errorSummaryLength,
    fieldShouldGainFocus: false,
  };

  return {
    day: {
      notProvided: () => {
        cy.keyboardInput(field.monthInput(), '1');
        cy.keyboardInput(field.yearInput(), '2023');
        submitButton().click();

        const errorMessage = CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INVALID_DAY;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      providedWithoutOtherFields: () => {
        cy.keyboardInput(field.dayInput(), '1');
        field.monthInput().clear();
        field.yearInput().clear();
        submitButton().click();

        const errorMessage = CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].MISSING_MONTH_AND_YEAR;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      notANumber: () => {
        cy.keyboardInput(field.dayInput().clear(), 'Test');
        submitButton().click();

        const errorMessage = CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INCORRECT_FORMAT;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
    },
    month: {
      notProvided: () => {
        cy.keyboardInput(field.dayInput(), '1');
        field.monthInput().clear();
        cy.keyboardInput(field.yearInput(), '2023');
        submitButton().click();

        const errorMessage = CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INVALID_MONTH;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      providedWithoutOtherFields: () => {
        field.dayInput().clear();
        cy.keyboardInput(field.monthInput(), '1');
        field.yearInput().clear();
        submitButton().click();

        const errorMessage = CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].MISSING_DAY_AND_YEAR;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      notANumber: () => {
        field.dayInput().clear();
        cy.keyboardInput(field.monthInput(), 'One');
        submitButton().click();

        const errorMessage = CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INCORRECT_FORMAT;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
    },
    year: {
      notProvided: () => {
        cy.keyboardInput(field.dayInput(), '1');
        cy.keyboardInput(field.monthInput(), '2');
        field.yearInput().clear();
        submitButton().click();

        const errorMessage = CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INVALID_YEAR;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      providedWithoutOtherFields: () => {
        field.dayInput().clear();
        field.monthInput().clear();
        cy.keyboardInput(field.yearInput(), '2023');
        submitButton().click();

        const errorMessage = CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].MISSING_DAY_AND_MONTH;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      notEnoughDigits: () => {
        cy.keyboardInput(field.dayInput(), '1');
        cy.keyboardInput(field.monthInput(), '2');
        cy.keyboardInput(field.yearInput(), '202');
        submitButton().click();

        const errorMessage = CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INVALID_YEAR_DIGITS;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      notANumber: () => {
        field.dayInput().clear();
        field.monthInput().clear();
        cy.keyboardInput(field.yearInput(), 'One');
        submitButton().click();

        const errorMessage = CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INCORRECT_FORMAT;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
    },
    notInTheFuture: () => {
      const now = new Date();
      const day = now.getDate();

      const yesterday = new Date(now.setDate(day - 1));

      cy.keyboardInput(field.dayInput(), yesterday.getDate());
      cy.keyboardInput(field.monthInput(), yesterday.getMonth());
      cy.keyboardInput(field.yearInput(), yesterday.getFullYear());
      submitButton().click();

      const errorMessage = CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].BEFORE_EARLIEST;

      cy.assertFieldErrors({
        ...assertFieldErrorsParams,
        errorMessage,
      });
    },
    invalidFormat: () => {
      const now = new Date();
      const day = now.getDate();

      const futureDate = new Date(now.setDate(day + 1));

      cy.keyboardInput(field.dayInput(), '50');
      cy.keyboardInput(field.monthInput(), '24');
      cy.keyboardInput(field.yearInput(), futureDate.getFullYear());
      submitButton().click();

      const errorMessage = CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INVALID_DATE;

      cy.assertFieldErrors({
        ...assertFieldErrorsParams,
        errorMessage,
      });
    },
    isToday: () => {
      const now = new Date();

      cy.keyboardInput(field.dayInput(), now.getDate());
      cy.keyboardInput(field.monthInput(), now.getMonth() + 1);
      cy.keyboardInput(field.yearInput(), now.getFullYear());

      submitButton().click();

      partials.errorSummaryListItems().eq(0).invoke('text').then((text) => {
        expect(text.trim()).not.equal(CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].BEFORE_EARLIEST);
      });

      field.errorMessage().should('not.exist');
    },
  };
};

const requestedCoverStartDate = {
  checkValidation,
};

export default requestedCoverStartDate;

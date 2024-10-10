import partials from '../../partials';

/**
 * checkValidation
 * Various validation assertions for the "requested start date" field, e.g
 * 1) day.notProvided
 * 2) day.providedWithoutOtherFields
 * 3) day.notANumber
 * 4) notInTheFuture
 * 5) invalidFormat
 * 6) isToday
 * 7) withTwoDateFields.cannotBeTheSame
 * 8) withTwoDateFields.cannotBeBefore
 * 9) withTwoDateFields.cannotBeAfter
 * @param {Number} errorSummaryLength: The number of expected errors in the summary list
 * @param {Number} errorIndex: Index of summary list error
 * @param {String} field: Cypress field selector
 * @param {String} fieldId: Field ID
 * @param {Object} errorMessages: Error messages
 */
const checkValidation = ({ errorSummaryLength, errorIndex = 0, field, fieldId, errorMessages }) => {
  const assertFieldErrorsParams = {
    field,
    errorIndex,
    errorSummaryLength,
    fieldShouldGainFocus: false,
  };

  return {
    day: {
      /**
       * Submit a date without a day.
       * Check validation errors.
       */
      notProvided: () => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        field.dayInput().clear();

        cy.completeDateFormFields({ idPrefix: fieldId, day: null, month, year });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.INVALID_DAY;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      /**
       * Submit only a day.
       * Check validation errors.
       */
      providedWithoutOtherFields: () => {
        field.monthInput().clear();
        field.yearInput().clear();

        cy.completeDateFormFields({ idPrefix: fieldId, day: '1', month: null, year: null });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.MISSING_MONTH_AND_YEAR;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      /**
       * Submit only a day as a string, not a number.
       * Check validation errors.
       */
      notANumber: () => {
        cy.completeDateFormFields({ idPrefix: fieldId, day: 'Test', month: null, year: null });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.INCORRECT_FORMAT;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      /**
       * Submit a full date, but with the day over the current month's last day.
       * Check validation errors.
       */
      isGreaterThanLastDayOfMonth: () => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const daysInMonth = new Date(year, month, 0).getDate();

        const invalidMonthDay = daysInMonth + 1;

        cy.completeDateFormFields({ idPrefix: fieldId, day: invalidMonthDay, month, year });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.INVALID_DAY;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
    },
    month: {
      /**
       * Submit a date without a month.
       * Check validation errors.
       */
      notProvided: () => {
        field.monthInput().clear();

        cy.completeDateFormFields({ idPrefix: fieldId, day: '1', month: null, year: '2023' });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.INVALID_MONTH;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      /**
       * Submit only a month.
       * Check validation errors.
       */
      providedWithoutOtherFields: () => {
        field.dayInput().clear();
        field.yearInput().clear();

        cy.completeDateFormFields({ idPrefix: fieldId, day: null, month: '1', year: null });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.MISSING_DAY_AND_YEAR;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      /**
       * Submit only a month as a string, not a number.
       * Check validation errors.
       */
      notANumber: () => {
        field.dayInput().clear();
        field.yearInput().clear();

        cy.completeDateFormFields({ idPrefix: fieldId, day: null, month: 'One', year: null });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.INCORRECT_FORMAT;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
    },
    year: {
      /**
       * Submit a date without a year.
       * Check validation errors.
       */
      notProvided: () => {
        field.yearInput().clear();

        cy.completeDateFormFields({ idPrefix: fieldId, day: '1', month: '2', year: null });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.INVALID_YEAR;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      /**
       * Submit only a year.
       * Check validation errors.
       */
      providedWithoutOtherFields: () => {
        field.dayInput().clear();
        field.monthInput().clear();

        cy.completeDateFormFields({ idPrefix: fieldId, day: null, month: null, year: '2023' });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.MISSING_DAY_AND_MONTH;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      /**
       * Submit a year that is less than 4 digits.
       * Check validation errors.
       */
      notEnoughDigits: () => {
        cy.completeDateFormFields({ idPrefix: fieldId, day: '1', month: '2', year: '202' });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.INVALID_YEAR_DIGITS;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
      /**
       * Submit only a year as a string, not a number.
       * Check validation errors.
       */
      notANumber: () => {
        field.dayInput().clear();
        field.monthInput().clear();

        cy.completeDateFormFields({ idPrefix: fieldId, day: null, month: null, year: 'One' });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.INCORRECT_FORMAT;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
        });
      },
    },
    /**
     * Submit a date that is not in the future.
     * Check validation errors.
     */
    notInTheFuture: () => {
      const now = new Date();
      const day = now.getDate();

      const yesterday = new Date(now.setDate(day - 1));
      const month = yesterday.getMonth() + 1;

      cy.completeDateFormFields({ idPrefix: fieldId, day: yesterday.getDate(), month, year: yesterday.getFullYear() });

      cy.clickSubmitButton();

      const errorMessage = errorMessages.BEFORE_EARLIEST;

      cy.assertFieldErrors({
        ...assertFieldErrorsParams,
        errorMessage,
      });
    },
    /**
     * Submit a date that has an invalid format.
     * Check validation errors.
     */
    invalidFormat: () => {
      const now = new Date();
      const day = now.getDate();

      const futureDate = new Date(now.setDate(day + 1));

      cy.completeDateFormFields({ idPrefix: fieldId, day, month: '24', year: futureDate.getFullYear() });

      cy.clickSubmitButton();

      const errorMessage = errorMessages.INVALID_DATE;

      cy.assertFieldErrors({
        ...assertFieldErrorsParams,
        errorMessage,
      });
    },
    /**
     * Submit a date that is today.
     * Check that validation errors are NOT rendered.
     */
    isToday: () => {
      const now = new Date();

      cy.completeDateFormFields({ idPrefix: fieldId, day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() });

      cy.clickSubmitButton();

      partials
        .errorSummaryListItems()
        .eq(0)
        .invoke('text')
        .then((text) => {
          expect(text.trim()).not.equal(errorMessages.BEFORE_EARLIEST);
        });

      field.errorMessage().should('not.exist');
    },
    /**
     * Validations for when there are 2 date fields.
     * E.g, start and end date fields.
     */
    withTwoDateFields: ({ fieldA, fieldB, expectedErrorSummaryLength, fieldBErrorIndex }) => ({
      /**
       * Enter the same date into both date fields.
       * Check validation errors.
       */
      cannotBeTheSame: (dateValue) => {
        const day = dateValue.getDate();
        const month = dateValue.getMonth() + 1;
        const year = dateValue.getFullYear();

        cy.completeDateFormFields({ idPrefix: fieldA, day, month, year });
        cy.completeDateFormFields({ idPrefix: fieldB, day, month, year });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.CANNOT_BE_THE_SAME;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
          errorIndex: fieldBErrorIndex,
          errorSummaryLength: expectedErrorSummaryLength,
        });
      },
      /**
       * Enter a date that is before the first date field.
       * Check validation errors.
       */
      cannotBeBefore: (dateValue) => {
        const day = dateValue.getDate();
        const month = dateValue.getMonth() + 1;
        const year = dateValue.getFullYear();

        cy.completeDateFormFields({ idPrefix: fieldB, day, month, year });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.CANNOT_BE_BEFORE;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
          errorIndex: fieldBErrorIndex,
          errorSummaryLength: expectedErrorSummaryLength,
        });
      },
      /**
       * Enter a date that is after the first date field.
       * Check validation errors.
       */
      cannotBeAfter: (dateValue) => {
        const day = dateValue.getDate();
        const month = dateValue.getMonth() + 1;
        const year = dateValue.getFullYear();

        cy.completeDateFormFields({ idPrefix: fieldB, day, month, year });

        cy.clickSubmitButton();

        const errorMessage = errorMessages.AFTER_LATEST;

        cy.assertFieldErrors({
          ...assertFieldErrorsParams,
          errorMessage,
          errorIndex: fieldBErrorIndex,
          errorSummaryLength: expectedErrorSummaryLength,
        });
      },
    }),
  };
};

const requestedCoverStartDate = {
  checkValidation,
};

export default requestedCoverStartDate;

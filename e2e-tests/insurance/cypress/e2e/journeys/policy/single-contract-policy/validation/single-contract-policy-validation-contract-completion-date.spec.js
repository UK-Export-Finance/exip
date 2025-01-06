import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ELIGIBILITY } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import dateField from '../../../../../../../commands/insurance/date-field';

const {
  CONTRACT_POLICY: {
    REQUESTED_START_DATE,
    SINGLE: { CONTRACT_COMPLETION_DATE },
  },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { SINGLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: { SINGLE: CONTRACT_ERROR_MESSAGES },
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy page - form validation - contract completion date', () => {
  let referenceNumber;
  let url;

  const field = fieldSelector(CONTRACT_COMPLETION_DATE);

  const { dayAssertions, monthAssertions, yearAssertions, notInTheFuture, invalidFormat, isToday, withTwoDateFields } = dateField.checkValidation({
    errorSummaryLength: 3,
    errorIndex: 1,
    field,
    fieldId: CONTRACT_COMPLETION_DATE,
    errorMessages: CONTRACT_ERROR_MESSAGES[CONTRACT_COMPLETION_DATE],
  });

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitPolicyForms({ formToStopAt: 'policyType' });

      url = `${baseUrl}${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('when the day is not provided', () => {
    dayAssertions.notProvided();
  });

  it('when the month is not provided', () => {
    monthAssertions.notProvided();
  });

  it('when the year is not provided', () => {
    yearAssertions.notProvided();
  });

  it('when the day is provided, but month and year are not', () => {
    dayAssertions.providedWithoutOtherFields();
  });

  it('when the month is provided, but day and year are not', () => {
    monthAssertions.providedWithoutOtherFields();
  });

  it('when the year is provided, but day and month are not', () => {
    yearAssertions.providedWithoutOtherFields();
  });

  it('when the day is not a number', () => {
    dayAssertions.notANumber();
  });

  it('when the month is not a number', () => {
    monthAssertions.notANumber();
  });

  it('when the year is not a number', () => {
    yearAssertions.notANumber();
  });

  it('when the day is greater than the last day of month', () => {
    dayAssertions.isGreaterThanLastDayOfMonth();
  });

  it('when the year does not have enough digits', () => {
    yearAssertions.notEnoughDigits();
  });

  it('when the the date is not in the future', () => {
    notInTheFuture();
  });

  it('when the the date has an invalid format', () => {
    invalidFormat();
  });

  it('should NOT render a validation error when the date is today', () => {
    isToday();
  });

  describe(`when ${REQUESTED_START_DATE} is also provided`, () => {
    const date = new Date();
    const initYear = date.getFullYear();
    const startDate = new Date(date.setFullYear(initYear + 1));

    const { day, month, year } = {
      day: startDate.getDate(),
      month: startDate.getMonth() + 1,
      year: startDate.getFullYear(),
    };

    const fieldA = {
      ...fieldSelector(REQUESTED_START_DATE),
      id: REQUESTED_START_DATE,
    };

    const fieldB = {
      ...fieldSelector(CONTRACT_COMPLETION_DATE),
      id: CONTRACT_COMPLETION_DATE,
    };

    const { cannotBeTheSame, cannotBeBefore, cannotBeAfter } = withTwoDateFields({
      fieldA,
      fieldB,
      fieldBErrorIndex: 0,
      expectedErrorSummaryLength: 2,
    });

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeDateFormFields({ idPrefix: REQUESTED_START_DATE, day, month, year });
    });

    it(`should render a validation error when the date is the same as ${REQUESTED_START_DATE}`, () => {
      cannotBeTheSame(startDate);
    });

    it(`should render a validation error when the date is before the ${REQUESTED_START_DATE}`, () => {
      const yesterday = new Date(date.setDate(day - 1));

      cannotBeBefore(yesterday);
    });

    it(`should render a validation error when the date is over the maximum years allowed after ${REQUESTED_START_DATE}`, () => {
      const additionalYears = year + ELIGIBILITY.MAX_COVER_PERIOD_YEARS;

      const futureDate = new Date(startDate.setFullYear(additionalYears));

      const additionalDays = new Date(futureDate).getDate() + 1;

      const overMaxDate = new Date(futureDate.setDate(additionalDays));

      cannotBeAfter(overMaxDate);
    });
  });
});

import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_VALUES, ELIGIBILITY } from '../../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import dateField from '../../../../../../../commands/insurance/date-field';

const {
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  POLICY: { SINGLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        SINGLE: CONTRACT_ERROR_MESSAGES,
      },
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy page - form validation - contract completion date', () => {
  let referenceNumber;
  let url;

  const field = fieldSelector(CONTRACT_COMPLETION_DATE);

  const {
    day,
    month,
    year,
    notInTheFuture,
    invalidFormat,
    isToday,
    withTwoDateFields,
  } = dateField.checkValidation({
    errorSummaryLength: 3,
    errorIndex: 1,
    field,
    fieldId: CONTRACT_COMPLETION_DATE,
    errorMessages: CONTRACT_ERROR_MESSAGES[CONTRACT_COMPLETION_DATE],
  });

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

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
    day.notProvided();
  });

  it('when the month is not provided', () => {
    month.notProvided();
  });

  it('when the year is not provided', () => {
    year.notProvided();
  });

  it('when the day is provided, but month and year are not', () => {
    day.providedWithoutOtherFields();
  });

  it('when the month is provided, but day and year are not', () => {
    month.providedWithoutOtherFields();
  });

  it('when the year is provided, but day and month are not', () => {
    year.providedWithoutOtherFields();
  });

  it('when the day is not a number', () => {
    day.notANumber();
  });

  it('when the month is not a number', () => {
    month.notANumber();
  });

  it('when the year is not a number', () => {
    year.notANumber();
  });

  it('when the day is greater than the last day of month', () => {
    day.isGreaterThanLastDayOfMonth();
  });

  it('when the year does not have enough digits', () => {
    year.notEnoughDigits();
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

    const startDateObj = {
      day: startDate.getDate(),
      month: startDate.getMonth() + 1,
      year: startDate.getFullYear(),
    };

    const fieldA = fieldSelector(REQUESTED_START_DATE);
    const fieldB = fieldSelector(CONTRACT_COMPLETION_DATE);

    const { cannotBeTheSame, cannotBeBefore, cannotBeAfter } = withTwoDateFields({
      fieldA,
      fieldB,
      fieldBErrorIndex: 0,
      expectedErrorSummaryLength: 2,
    });

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(REQUESTED_START_DATE).dayInput(), startDateObj.day);
      cy.keyboardInput(fieldSelector(REQUESTED_START_DATE).monthInput(), startDateObj.month);
      cy.keyboardInput(fieldSelector(REQUESTED_START_DATE).yearInput(), startDateObj.year);
    });

    it(`should render a validation error when the date is the same as ${REQUESTED_START_DATE}`, () => {
      cannotBeTheSame(startDate);
    });

    it(`should render a validation error when the date is before the ${REQUESTED_START_DATE}`, () => {
      const yesterday = new Date(date.setDate(startDateObj.day - 1));

      cannotBeBefore(yesterday);
    });

    it(`should render a validation error when the date is over the maximum years allowed after ${REQUESTED_START_DATE}`, () => {
      const additionalYears = startDateObj.year + ELIGIBILITY.MAX_COVER_PERIOD_YEARS;

      const futureDate = new Date(startDate.setFullYear(additionalYears));

      const additionalDays = new Date(futureDate).getDate() + 1;

      const overMaxDate = new Date(futureDate.setDate(additionalDays));

      cannotBeAfter(overMaxDate);
    });
  });
});

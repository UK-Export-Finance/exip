import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { APPLICATION } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import dateField from '../../../../../../../commands/insurance/date-field';

const {
  ROOT,
  POLICY: { MULTIPLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

const {
  CONTRACT_POLICY: { REQUESTED_START_DATE },
} = POLICY_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: { CONTRACT_POLICY: CONTRACT_ERROR_MESSAGES },
  },
} = ERROR_MESSAGES;

const { MULTIPLE } = APPLICATION.POLICY_TYPE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy page - form validation - requested start date', () => {
  let referenceNumber;
  let url;

  const field = fieldSelector(REQUESTED_START_DATE);

  const { dayAssertions, monthAssertions, yearAssertions, notInTheFuture, invalidFormat, isToday } = dateField.checkValidation({
    errorSummaryLength: 3,
    errorIndex: 0,
    field,
    fieldId: REQUESTED_START_DATE,
    errorMessages: CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE],
  });

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'policyType', policyType: MULTIPLE });

      url = `${baseUrl}${ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;

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
});

import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import dateField from '../../../../../../../commands/insurance/date-field';

const {
  ROOT,
  POLICY: { SINGLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

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

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy page - form validation - requested start date', () => {
  let referenceNumber;
  let url;

  const field = fieldSelector(REQUESTED_START_DATE);

  const {
    day,
    month,
    year,
    notInTheFuture,
    invalidFormat,
    isToday,
  } = dateField.checkValidation({
    errorSummaryLength: 4,
    errorIndex: 0,
    field,
    fieldId: REQUESTED_START_DATE,
    errorMessages: CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE],
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
});

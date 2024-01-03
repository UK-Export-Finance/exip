import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import requestedCoverStartDate from '../../../../../../../commands/insurance/requested-start-date-field';

const {
  ROOT,
  POLICY: { MULTIPLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

const { checkValidation } = requestedCoverStartDate;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy page - form validation - requested start date', () => {
  let referenceNumber;
  let url;

  const {
    day,
    month,
    year,
    notInTheFuture,
    invalidFormat,
    isToday,
  } = checkValidation({ errorSummaryLength: 3 });

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

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

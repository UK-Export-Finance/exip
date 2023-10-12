import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import requestedCoverStartDate from '../../../../../../../commands/insurance/requested-start-date-field';

const {
  ROOT,
  POLICY: { SINGLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const { checkValidation } = requestedCoverStartDate;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy page - form validation - requested start date', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      taskList.prepareApplication.tasks.policy.link().click();

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

  it('should render a validation error when day is not provided', () => {
    checkValidation.day.notProvided();
  });

  it('should render a validation error when month is not provided', () => {
    checkValidation.month.notProvided();
  });

  it('should render a validation error when year is not provided', () => {
    checkValidation.year.notProvided();
  });

  it('should render a validation error when day is not a number', () => {
    checkValidation.day.notANumber();
  });

  it('should render a validation error when month is not a number', () => {
    checkValidation.month.notANumber();
  });

  it('should render a validation error when year is not a number', () => {
    checkValidation.year.notANumber();
  });

  it('should render a validation error when the date is not in the future', () => {
    checkValidation.notInTheFuture();
  });

  it('should render a validation error when the date has an invalid format', () => {
    checkValidation.notInTheFuture();
  });

  it('should NOT render a validation error when the date is today', () => {
    checkValidation.isToday();
  });
});

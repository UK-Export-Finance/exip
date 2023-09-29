import partials from '../../../../../../../partials';
import { FIELD_VALUES, ROUTES } from '../../../../../../../constants';
import requestedCoverStartDate from '../../../../../../../commands/insurance/requested-start-date-field';

const { taskList } = partials.insurancePartials;

const { checkValidation } = requestedCoverStartDate;

const { INSURANCE } = ROUTES;

context('Insurance - Policy and exports - Single contract policy page - form validation - requested start date', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      url = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`;

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

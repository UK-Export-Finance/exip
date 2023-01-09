import { submitButton } from '../../../../../pages/shared';
import { typeOfPolicyPage } from '../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../partials';
import { FIELD_IDS, ROUTES } from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';
import requestedCoverStartDate from '../../../../../../support/insurance/requested-start-date-field';

const { taskList } = partials.insurancePartials;

const multiplePolicyFieldId = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;
const multiplePolicyField = typeOfPolicyPage[multiplePolicyFieldId].multiple;

const { checkValidation } = requestedCoverStartDate;

const { INSURANCE } = ROUTES;

context('Insurance - Policy and exports - Multiple contract policy page - form validation - requested start date', () => {
  let referenceNumber;

  before(() => {
    cy.visit(INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    multiplePolicyField.input().click();
    submitButton().click();

    getReferenceNumber().then((id) => {
      referenceNumber = id;
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when day is not provided', () => {
    it('should render a validation error', () => {
      checkValidation.day.notProvided();
    });
  });

  describe('when month is not provided', () => {
    it('should render a validation error', () => {
      checkValidation.month.notProvided();
    });
  });

  describe('when year is not provided', () => {
    it('should render a validation error', () => {
      checkValidation.year.notProvided();
    });
  });

  describe('when day is not a number', () => {
    it('should render a validation error', () => {
      checkValidation.day.notANumber();
    });
  });

  describe('when month is not a number', () => {
    it('should render a validation error', () => {
      checkValidation.month.notANumber();
    });
  });

  describe('when year is not a number', () => {
    it('should render a validation error', () => {
      checkValidation.year.notANumber();
    });
  });

  describe('when the date is not in the future', () => {
    it('should render a validation error', () => {
      checkValidation.notInTheFuture();
    });
  });
});

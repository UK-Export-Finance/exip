import { submitButton } from '../../../pages/shared';
import partials from '../../../partials';
import { TASKS } from '../../../../../content-strings';
import { ROUTES, FIELD_VALUES } from '../../../../../constants';

const { taskList } = partials.insurancePartials;

const { ROOT, ALL_SECTIONS } = ROUTES.INSURANCE;

const { STATUS: { NOT_STARTED_YET } } = TASKS;

context('Insurance - Task list - complete `prepare application` group', () => {
  before(() => {
    cy.completeSignInAndGoToApplication().then((referenceNumber) => {
      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', url);
    });
  });

  after(() => {
    cy.deleteAccount();
  });

  describe('after completing all tasks in the `prepare application` group', () => {
    beforeEach(() => {
      cy.saveSession();

      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      cy.completeAndSubmitSingleContractPolicyForm();

      cy.completeAndSubmitAboutGoodsOrServicesForm();

      submitButton().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();

      cy.completeAndSubmitBrokerForm();

      submitButton().click();
      cy.completeAndSubmitCompanyOrOrganisationForm();
      cy.completeAndSubmitWorkingWithBuyerForm();

      submitButton().click();
    });

    it('should render a `declarations` task with a link and `not started` status', () => {
      const task = taskList.submitApplication.tasks.declarations;

      cy.checkTaskStatus(task, NOT_STARTED_YET);
    });
  });
});

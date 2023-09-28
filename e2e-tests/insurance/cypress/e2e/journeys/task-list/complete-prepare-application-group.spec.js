import partials from '../../../../../partials';
import { TASKS } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const { taskList } = partials.insurancePartials;

const { ROOT, ALL_SECTIONS } = ROUTES.INSURANCE;

const { STATUS: { NOT_STARTED_YET } } = TASKS;

context('Insurance - Task list - complete `prepare application` group', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(url);
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('after completing all tasks in the `prepare application` group', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });
    });

    it('should render a `declarations` task with a link and `not started` status', () => {
      const task = taskList.submitApplication.tasks.declarationsAndSubmit;

      cy.checkTaskStatus(task, NOT_STARTED_YET);
    });
  });
});

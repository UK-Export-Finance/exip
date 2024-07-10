import { ROUTES } from '../../../../../constants';

const { ROOT, ALL_SECTIONS } = ROUTES.INSURANCE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Task list - complete `prepare application` group', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      const url = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

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
      cy.checkTaskDeclarationsAndSubmitStatusIsNotStartedYet();
    });
  });
});

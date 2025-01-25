import { ROUTES } from '../../../../../constants';

const { ROOT, ALL_SECTIONS } = ROUTES.INSURANCE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Task list - complete `prepare application` group', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(url);

      cy.completePrepareApplicationSinglePolicyType({});
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('after completing all tasks in the `prepare application` group', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);
    });

    it('should render a `check your answers` task with a status of `not started yet`', () => {
      cy.checkTaskCheckAnswersStatusIsNotStartedYet();
    });

    it('should render a `declarations and submit` task with a link and `cannot start` status', () => {
      cy.checkTaskDeclarationsAndSubmitStatusIsCannotStart();
    });
  });
});

import { checkYourAnswersEligibility, checkYourAnswersNeedToStartNewApplication } from '../../../../../../pages/insurance/check-your-answers';
import dashboardPage from '../../../../../../pages/insurance/dashboard';
import partials from '../../../../../../partials';
import { ROUTES } from '../../../../../../constants';

const { DASHBOARD } = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const { linkButtons } = checkYourAnswersNeedToStartNewApplication;

context('Insurance - Check your answers - Need to start new application - start a new application', () => {
  let referenceNumber;
  const dashboardUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      // go to the check your answers - policy and exports page
      task.link().click();

      // go to the "you need to start a new application" page
      checkYourAnswersEligibility.bannerLink().click();

      // click "start a new application"
      linkButtons.startNewApplication().click();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('after completing eligibility for the new application', () => {
    before(() => {
      cy.submitInsuranceEligibilityAnswersFromBuyerCountryHappyPath();
    });

    beforeEach(() => {
      cy.navigateToUrl(dashboardUrl);
    });

    it(`should redirect to ${DASHBOARD}`, () => {
      cy.assertUrl(dashboardUrl);
    });

    it('should now render 2 applications in the dashboard', () => {
      dashboardPage.table.body.rows().should('have.length', 2);
    });
  });
});

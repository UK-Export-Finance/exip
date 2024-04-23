import partials from '../../../../../../partials';
import { ROUTES } from '../../../../../../constants';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Policy page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      // To get past previous "Check your answers" pages
      cy.submitCheckYourAnswersForm();
      cy.submitCheckYourAnswersForm();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should redirect to `all sections`', () => {
    cy.clickSaveAndBackButton();

    cy.assertAllSectionsUrl(referenceNumber);
  });

  it('should retain the status of task `check your answers` as `in progress`', () => {
    cy.navigateToAllSectionsUrl(referenceNumber);

    cy.checkTaskCheckAnswersStatusIsInProgress();
  });
});

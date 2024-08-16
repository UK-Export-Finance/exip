import partials from '../../../../../../partials';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Export contract page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${EXPORT_CONTRACT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.clickSaveAndBackButton();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should redirect to `all sections`', () => {
    cy.assertAllSectionsUrl(referenceNumber);
  });

  it('should retain the status of task `check your answers` as `in progress`', () => {
    cy.checkTaskCheckAnswersStatusIsInProgress();
  });

  it('should retain the status of task `declarations and submit` as `not started yet`', () => {
    cy.checkTaskDeclarationsAndSubmitStatusIsCannotStart();
  });
});

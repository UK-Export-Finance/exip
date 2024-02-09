import partials from '../../../../../../partials';
import { ROUTES } from '../../../../../../constants';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Policy page - Save and back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

      allSectionsUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${ALL_SECTIONS}`, () => {
    cy.clickSaveAndBackButton();

    cy.assertUrl(allSectionsUrl);
  });

  it('should retain the status of task `check your answers` as `in progress`', () => {
    cy.navigateToUrl(allSectionsUrl);

    cy.checkTaskCheckAnswersStatusIsInProgress();
  });
});

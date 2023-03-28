import { submitButton, saveAndBackButton } from '../../../../pages/shared';
import partials from '../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  CHECK_YOUR_ANSWERS: { YOUR_BUYER },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

context('Insurance - Check your answers - Your buyer page - Save and back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType();

      task.link().click();

      // to get past eligibility check your answers page
      submitButton().click();
      // to get past policy and exports check your answers page
      submitButton().click();
      // to get past your business check your answers page
      submitButton().click();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUYER}`;

      allSectionsUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  it(`should redirect to ${ALL_SECTIONS}`, () => {
    saveAndBackButton().click();

    cy.url().should('eq', allSectionsUrl);
  });

  it('should change the status of task `check your answers` to `completed`', () => {
    cy.navigateToUrl(allSectionsUrl);

    cy.checkTaskStatus(task, TASKS.STATUS.COMPLETED);
  });
});

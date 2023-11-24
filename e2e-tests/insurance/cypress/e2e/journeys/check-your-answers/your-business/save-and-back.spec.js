import { saveAndBackButton } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

context('Insurance - Check your answers - Your business page - Save and back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      // To get past "Policy" check your answers page
      cy.submitCheckYourAnswersForm();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

      allSectionsUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

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
    saveAndBackButton().click();

    cy.assertUrl(allSectionsUrl);
  });

  it('should retain the status of task `check your answers` as `in progress`', () => {
    cy.navigateToUrl(allSectionsUrl);

    cy.checkTaskStatus(task, TASKS.STATUS.IN_PROGRESS);
  });
});

import partials from '../../../../../../../partials';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { assertMinimalExportContractSummaryListRows } from '../../../../../../../shared-test-assertions';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Export contract - Summary list - As an exporter, I want to be able to review my input for the export contract again, So that I can do a final review of the information I previously input before submitting my application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      // To get past previous "Check your answers" pages
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 3 });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${EXPORT_CONTRACT}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  assertMinimalExportContractSummaryListRows();
});

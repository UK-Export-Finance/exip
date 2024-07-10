import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { assertMinimalExportContractSummaryListRows } from '../../../../../../../shared-test-assertions';

const {
  ROOT,
  EXPORT_CONTRACT,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Check your answers - Summary list - application under total contract value threshold, no private insurance attempt, not using an agent', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({ }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT.CHECK_YOUR_ANSWERS}`;
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

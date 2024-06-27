import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { assertFullyPopulatedExportContractSummaryListRows } from '../../../../../../../shared-test-assertions';

const { ROOT, EXPORT_CONTRACT } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Export contract - Check your answers - Summary list - application over total contract value threshold, private insurance attempt, using an agent, agent is chraging - percentage method',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeExportContractSection({
          totalContractValueOverThreshold: true,
          attemptedPrivateMarketCover: true,
          isUsingAgent: true,
          agentIsCharging: true,
          agentChargeMethodPercentage: true,
          finalDestinationKnown: true,
        });

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

    assertFullyPopulatedExportContractSummaryListRows({
      agentChargeMethodPercentage: true,
    });
  },
);

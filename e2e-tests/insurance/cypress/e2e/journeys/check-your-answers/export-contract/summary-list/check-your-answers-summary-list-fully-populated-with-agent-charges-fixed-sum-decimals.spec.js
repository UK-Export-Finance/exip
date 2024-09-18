import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { assertFullyPopulatedExportContractSummaryListRows } from '../../../../../../../shared-test-assertions';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

// TODO: EMS-3828 - renable
context.skip(
  'Insurance - Check your answers - Export contract - Summary list - total contract value threshold, private insurance attempt, using an agent, agent is charging - fixed sum method with decimal places',
  () => {
    let referenceNumber;
    let url;

    const fixedSumAmount = '1000.50';

    before(() => {
      cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({
          referenceNumber,
          totalContractValueOverThreshold: true,
          attemptedPrivateMarketCover: true,
          isUsingAgent: true,
          agentIsCharging: true,
          agentChargeMethodFixedSum: true,
          finalDestinationKnown: true,
          agentChargeFixedSumAmount: fixedSumAmount,
        });

        cy.clickTaskCheckAnswers();

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

    assertFullyPopulatedExportContractSummaryListRows({
      agentChargeMethodFixedSum: true,
      agentChargeFixedSumAmount: fixedSumAmount,
    });
  },
);

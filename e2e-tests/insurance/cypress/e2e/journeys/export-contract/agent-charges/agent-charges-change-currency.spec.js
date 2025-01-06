import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { assertCurrencyFormFields } from '../../../../../../shared-test-assertions';

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES, HOW_MUCH_THE_AGENT_IS_CHARGING },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context("Insurance - Export contract - Agent charges page - As an Exporter I want to change the currency of my agent's charges", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitExportContractForms({ formToStopAt: 'agentService', isUsingAgent: true, agentIsCharging: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES}`;

      cy.assertUrl(url);
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`${HOW_MUCH_THE_AGENT_IS_CHARGING} prefixes should be displayed based on the chosen currency`, () => {
    beforeEach(() => {
      cy.saveSession();
      cy.navigateToUrl(url);

      cy.completeAndSubmitAgentChargesForm({
        fixedSumMethod: true,
        percentageMethod: false,
      });
    });

    const { prefixAssertions } = assertCurrencyFormFields({ fieldId: FIXED_SUM_AMOUNT });

    prefixAssertions();
  });
});

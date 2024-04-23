import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { assertCurrencyFormFields } from '../../../../../../shared-test-assertions';

const {
  ROOT,
  EXPORT_CONTRACT: {
    AGENT_CHARGES,
  },
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
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitAboutGoodsOrServicesForm({});
      cy.completeAndSubmitHowYouWillGetPaidForm({});
      cy.completeAndSubmitAgentForm({ isUsingAgent: true });
      cy.completeAndSubmitAgentDetailsForm({});
      cy.completeAndSubmitAgentServiceForm({ agentIsCharging: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
    cy.navigateToUrl(url);

    cy.completeAgentChargesForm({
      fixedSumMethod: true,
      fixedSumAmount: null,
      payableCountry: null,
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('prefixes should be displayed based on the chosen currency', () => {
    before(() => {
      cy.saveSession();
      cy.navigateToUrl(url);

      cy.completeAndSubmitAgentChargesForm({
        fixedSumMethod: true,
        fixedSumAmount: null,
        payableCountry: null,
      });
    });

    const { prefixAssertions } = assertCurrencyFormFields({ fieldId: FIXED_SUM_AMOUNT });

    prefixAssertions();
  });
});

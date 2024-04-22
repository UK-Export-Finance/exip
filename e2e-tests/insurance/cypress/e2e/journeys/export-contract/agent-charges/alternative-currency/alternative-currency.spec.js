import { headingCaption } from '../../../../../../../pages/shared';
import { BUTTONS, ERROR_MESSAGES, PAGES } from '../../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/export-contract';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { assertCurrencyFormFields } from '../../../../../../../shared-test-assertions';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES_ALTERNATIVE_CURRENCY;

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES_ALTERNATIVE_CURRENCY, AGENT_CHARGES },
} = INSURANCE_ROUTES;

const { CURRENCY: { CURRENCY_CODE } } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      AGENT_CHARGES_ALTERNATIVE_CURRENCY: CURRENCY_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context("Insurance - Export contract - Agent charges - Alternative currency page - As an Exporter, I want to be able to choose another currency to report my agent's fees in, So that I can provide accurate information regarding any fees I have incurred in winning my export contract", () => {
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
      cy.completeAgentChargesForm({ fixedSumMethod: true });

      cy.clickProvideAlternativeCurrencyLink();

      url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES_ALTERNATIVE_CURRENCY}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: FIELDS.AGENT_CHARGES[CURRENCY_CODE].LEGEND,
      currentHref: `${ROOT}/${referenceNumber}${AGENT_CHARGES_ALTERNATIVE_CURRENCY}`,
      backLink: `${ROOT}/${referenceNumber}${AGENT_CHARGES}`,
      submitButtonCopy: BUTTONS.CONFIRM,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });
  });

  describe('currency form fields', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    const { rendering, formSubmission } = assertCurrencyFormFields({
      gbpCurrencyCheckedByDefault: true,
      errors: CURRENCY_ERROR_MESSAGES,
    });

    rendering();

    formSubmission().selectAltRadioButNoAltCurrency({});

    formSubmission().submitASupportedCurrency({ url: AGENT_CHARGES });
    formSubmission().submitAlternativeCurrency({ url: AGENT_CHARGES });
  });
});

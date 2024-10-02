import { headingCaption } from '../../../../../../pages/shared';
import { ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/export-contract';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { assertCurrencyFormFields } from '../../../../../../shared-test-assertions';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES_CURRENCY;

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES, AGENT_CHARGES_CURRENCY, HOW_MUCH_THE_AGENT_IS_CHARGING },
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: { AGENT_CHARGES_CURRENCY: CURRENCY_ERROR_MESSAGES },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context(
  "Insurance - Export contract - Agent charges - Alternative currency page - As an Exporter, I want to be able to choose another currency to report my agent's fees in, So that I can provide accurate information regarding any fees I have incurred in winning my export contract",
  () => {
    let referenceNumber;
    let url;
    let howMuchAgentIsChargingUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitExportContractForms({ formToStopAt: 'agentCharges', isUsingAgent: true, agentIsCharging: true, fixedSumMethod: true });

        url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES_CURRENCY}`;
        howMuchAgentIsChargingUrl = `${baseUrl}${ROOT}/${referenceNumber}${HOW_MUCH_THE_AGENT_IS_CHARGING}`;
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
        currentHref: `${ROOT}/${referenceNumber}${AGENT_CHARGES_CURRENCY}`,
        backLink: `${ROOT}/${referenceNumber}${AGENT_CHARGES}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it('renders a `save and back` button', () => {
        cy.assertSaveAndBackButton();
      });
    });

    describe('currency form fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      const { rendering, formSubmission } = assertCurrencyFormFields({
        gbpCurrencyCheckedByDefault: true,
        errors: CURRENCY_ERROR_MESSAGES,
        expectedRedirectUrl: AGENT_CHARGES,
      });

      rendering();

      formSubmission({}).executeTests();
    });

    describe('form submission', () => {
      it(`should redirect to ${HOW_MUCH_THE_AGENT_IS_CHARGING}`, () => {
        cy.completeAndSubmitAlternativeCurrencyForm({});

        cy.assertUrl(howMuchAgentIsChargingUrl);
      });
    });
  },
);

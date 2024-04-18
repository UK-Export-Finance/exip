import { field as fieldSelector, headingCaption } from '../../../../../../pages/shared';
import { agentChargesPage } from '../../../../../../pages/insurance/export-contract';
import { SYMBOLS } from '../../../../../../constants';
import { PAGES } from '../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/export-contract';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { assertCountryAutocompleteInput } from '../../../../../../shared-test-assertions';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES;

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES, AGENT_SERVICE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: {
    METHOD, FIXED_SUM, PERCENTAGE, PAYABLE_COUNTRY_CODE, FIXED_SUM_AMOUNT, CHARGE_PERCENTAGE,
  },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context("Insurance - Export contract - Agent charges page - As an Exporter, I want to state what my agen's charges are, So that UKEF, the legal team and the British Embassy are aware of expenses incurred in my export contract bid", () => {
  let referenceNumber;
  let url;
  let checkYourAnswersUrl;

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
      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
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
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${AGENT_CHARGES}`,
      backLink: `${ROOT}/${referenceNumber}${AGENT_SERVICE}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    describe(`${METHOD} label and inputs`, () => {
      const { OPTIONS } = FIELDS.AGENT_CHARGES[METHOD];

      it(`renders a ${FIXED_SUM} radio input with label`, () => {
        const field = agentChargesPage[METHOD][FIXED_SUM];

        field.input().should('exist');
        cy.checkText(field.label(), OPTIONS.FIXED_SUM.TEXT);
      });

      it(`renders a ${PERCENTAGE} radio input with label`, () => {
        const field = agentChargesPage[METHOD][PERCENTAGE];

        field.input().should('exist');
        cy.checkText(field.label(), OPTIONS.PERCENTAGE.TEXT);
      });

      it(`should NOT display conditional "${FIXED_SUM_AMOUNT}" field`, () => {
        fieldSelector(FIXED_SUM_AMOUNT).input().should('not.be.visible');
      });

      it(`should NOT display conditional "${CHARGE_PERCENTAGE}" field`, () => {
        fieldSelector(CHARGE_PERCENTAGE).input().should('not.be.visible');
      });

      it(`should display conditional "${FIXED_SUM_AMOUNT}" field when selecting the ${FIXED_SUM} radio`, () => {
        agentChargesPage[METHOD][FIXED_SUM].label().click();

        const fieldId = FIXED_SUM_AMOUNT;

        const field = fieldSelector(fieldId);

        field.input().should('be.visible');
        cy.checkText(field.label(), FIELDS.AGENT_CHARGES[fieldId].LABEL);
        cy.assertPrefix({ fieldId, value: SYMBOLS.GBP });
      });

      it(`should display conditional "${CHARGE_PERCENTAGE}" field when selecting the ${PERCENTAGE} radio`, () => {
        agentChargesPage[METHOD][PERCENTAGE].label().click();

        const fieldId = CHARGE_PERCENTAGE;

        const field = fieldSelector(fieldId);

        field.input().should('be.visible');
        cy.checkText(field.label(), FIELDS.AGENT_CHARGES[fieldId].LABEL);
        cy.assertSuffix({ fieldId, value: FIELDS.AGENT_CHARGES[fieldId].SUFFIX });
      });
    });

    describe(`searchable autocomplete input (${PAYABLE_COUNTRY_CODE})`, () => {
      assertCountryAutocompleteInput({ fieldId: PAYABLE_COUNTRY_CODE });
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    describe(`when submitting with ${METHOD} as ${FIXED_SUM}`, () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.completeAndSubmitAgentChargesForm({ fixedSumMethod: true });

        cy.assertUrl(checkYourAnswersUrl);
      });

      describe('when going back to the page', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should have the submitted values', () => {
          cy.assertAgentChargesFieldValues({ fixedSumMethod: true });
        });

        it(`should NOT display conditional "${CHARGE_PERCENTAGE}" field`, () => {
          fieldSelector(CHARGE_PERCENTAGE).input().should('not.be.visible');
        });

        it(`should display conditional "${FIXED_SUM_AMOUNT}" field`, () => {
          fieldSelector(FIXED_SUM_AMOUNT).input().should('be.visible');
        });
      });
    });

    describe(`when submitting with ${METHOD} as ${PERCENTAGE}`, () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.completeAndSubmitAgentChargesForm({ percentageMethod: true });

        cy.assertUrl(checkYourAnswersUrl);
      });

      describe('when going back to the page', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should have the submitted values', () => {
          cy.assertAgentChargesFieldValues({ percentageMethod: true });
        });

        it(`should NOT display conditional "${FIXED_SUM_AMOUNT}" field`, () => {
          fieldSelector(FIXED_SUM_AMOUNT).input().should('not.be.visible');
        });

        it(`should display conditional "${CHARGE_PERCENTAGE}" field`, () => {
          fieldSelector(CHARGE_PERCENTAGE).input().should('be.visible');
        });
      });
    });
  });
});

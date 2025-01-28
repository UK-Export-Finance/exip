import { field as fieldSelector, headingCaption } from '../../../../../../pages/shared';
import { agentChargesPage } from '../../../../../../pages/insurance/export-contract';
import { PAGES } from '../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/export-contract';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { assertCountryAutocompleteInput } from '../../../../../../shared-test-assertions';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES;

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES, AGENT_CHARGES_CURRENCY, AGENT_SERVICE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { METHOD, FIXED_SUM, PERCENTAGE, PAYABLE_COUNTRY_CODE, PERCENTAGE_CHARGE },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  "Insurance - Export contract - Agent charges page - As an Exporter, I want to state what my agent's charges are, So that UKEF, the legal team and the British Embassy are aware of expenses incurred in my export contract bid",
  () => {
    let referenceNumber;
    let url;
    let agentChargesCurrencyUrl;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitExportContractForms({ stopSubmittingAfter: 'agentService', isUsingAgent: true, agentIsCharging: true });

        url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES}`;
        agentChargesCurrencyUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES_CURRENCY}`;
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
        const { LABEL, OPTIONS } = FIELDS.AGENT_CHARGES[METHOD];

        it(`renders a ${METHOD} legend`, () => {
          cy.checkText(fieldSelector(METHOD).legend(), LABEL);
        });

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

        it(`should NOT display a conditional "${PERCENTAGE_CHARGE}" field`, () => {
          fieldSelector(PERCENTAGE_CHARGE).input().should('not.be.visible');
        });

        it(`should render a conditional "${PERCENTAGE_CHARGE}" field when selecting the ${PERCENTAGE} radio`, () => {
          agentChargesPage[METHOD][PERCENTAGE].label().click();

          const fieldId = PERCENTAGE_CHARGE;

          const field = fieldSelector(fieldId);

          field.input().should('be.visible');
          cy.checkText(field.label(), FIELDS.AGENT_CHARGES[fieldId].LABEL);
          cy.assertSuffix({ fieldId, value: FIELDS.AGENT_CHARGES[fieldId].SUFFIX });
        });
      });

      describe(`searchable autocomplete input (${PAYABLE_COUNTRY_CODE})`, () => {
        assertCountryAutocompleteInput({
          fieldId: PAYABLE_COUNTRY_CODE,
          assertFilteredCisCountries: false,
        });
      });
    });

    describe('form submission', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      describe(`when submitting with ${METHOD} as ${FIXED_SUM}`, () => {
        it(`should redirect to ${AGENT_CHARGES_CURRENCY}`, () => {
          cy.completeAndSubmitAgentChargesForm({ fixedSumMethod: true });

          cy.assertUrl(agentChargesCurrencyUrl);
        });

        it('should retain the `export contract` task status as `in progress`', () => {
          cy.navigateToAllSectionsUrl(referenceNumber);

          cy.checkTaskExportContractStatusIsInProgress();
        });

        describe('when going back to the page', () => {
          beforeEach(() => {
            cy.navigateToUrl(url);
          });

          it('should have the submitted values', () => {
            cy.assertAgentChargesFieldValues({ fixedSumMethod: true });
          });

          it(`should NOT display conditional "${PERCENTAGE_CHARGE}" field`, () => {
            fieldSelector(PERCENTAGE_CHARGE).input().should('not.be.visible');
          });
        });
      });

      describe(`when submitting with ${METHOD} as ${PERCENTAGE}`, () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.completeAndSubmitAgentChargesForm({ percentageMethod: true });

          cy.assertUrl(checkYourAnswersUrl);
        });

        it('should update the `export contract` task status to `completed`', () => {
          cy.navigateToAllSectionsUrl(referenceNumber);

          cy.checkTaskExportContractStatusIsComplete();
        });

        describe('when going back to the page', () => {
          beforeEach(() => {
            cy.navigateToUrl(url);
          });

          it('should have the submitted values', () => {
            cy.assertAgentChargesFieldValues({ percentageMethod: true });
          });

          it(`should render a conditional "${PERCENTAGE_CHARGE}" field`, () => {
            fieldSelector(PERCENTAGE_CHARGE).input().should('be.visible');
          });
        });
      });
    });
  },
);

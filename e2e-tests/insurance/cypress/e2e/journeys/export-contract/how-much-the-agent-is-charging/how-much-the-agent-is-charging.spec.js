import { field as fieldSelector, headingCaption } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELD_STRINGS } from '../../../../../../content-strings/fields/insurance/export-contract';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { GBP, SYMBOLS } from '../../../../../../fixtures/currencies';
import application from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.HOW_MUCH_THE_AGENT_IS_CHARGING;

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES_CURRENCY, HOW_MUCH_THE_AGENT_IS_CHARGING, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT: FIELD_ID },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  "Insurance - Export contract - How much the agent is charging page - As an exporter, I want to state what my agent's charges are, So that UKEF, the legal team and the British Embassy are aware of expenses incurred in my export contract bid",
  () => {
    let referenceNumber;
    let url;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitExportContractForms({
          stopSubmittingAfter: 'currencyOfAgentCharges',
          isUsingAgent: true,
          agentIsCharging: true,
          fixedSumMethod: true,
        });

        url = `${baseUrl}${ROOT}/${referenceNumber}${HOW_MUCH_THE_AGENT_IS_CHARGING}`;
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
        pageTitle: `${CONTENT_STRINGS.PAGE_TITLE} ${GBP.name}?`,
        currentHref: `${ROOT}/${referenceNumber}${HOW_MUCH_THE_AGENT_IS_CHARGING}`,
        backLink: `${ROOT}/${referenceNumber}${AGENT_CHARGES_CURRENCY}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it(`renders ${FIELD_ID} hint, prefix and input`, () => {
        const field = fieldSelector(FIELD_ID);

        cy.checkText(field.hint(), FIELD_STRINGS.AGENT_CHARGES[FIELD_ID].HINT);

        cy.assertPrefix({ fieldId: FIELD_ID, value: SYMBOLS.GBP });

        field.input().should('exist');
      });
    });

    describe('form submission', () => {
      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitHowMuchTheAgentIsChargingForm({});

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

        it('should have the submitted value', () => {
          cy.checkValue(fieldSelector(FIELD_ID), application.EXPORT_CONTRACT.AGENT_CHARGES[FIELD_ID]);
        });
      });
    });
  },
);

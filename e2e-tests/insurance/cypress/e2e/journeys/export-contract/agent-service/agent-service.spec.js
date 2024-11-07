import { headingCaption, noRadio, yesRadio } from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { PAGES } from '../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/export-contract';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_SERVICE;

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_DETAILS, AGENT_SERVICE, CHECK_YOUR_ANSWERS, AGENT_CHARGES },
} = INSURANCE_ROUTES;

const {
  AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Export contract - Agent service page - As an Exporter, I want to give details about the agent that helped me win the export contract, So that UKEF can contact the appropriate parties to find out more about the working relationship',
  () => {
    let referenceNumber;
    let url;
    let checkYourAnswersUrl;
    let agentChargesUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitExportContractForms({ stopSubmittingAfter: 'agentDetails', isUsingAgent: true });

        url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_SERVICE}`;
        checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
        agentChargesUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES}`;

        cy.assertUrl(url);
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
        currentHref: `${ROOT}/${referenceNumber}${AGENT_SERVICE}`,
        backLink: `${ROOT}/${referenceNumber}${AGENT_DETAILS}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it(`renders ${SERVICE_DESCRIPTION} label and input`, () => {
        const fieldId = SERVICE_DESCRIPTION;
        const fieldStrings = FIELDS.AGENT_SERVICE[fieldId];

        cy.assertTextareaRendering({
          fieldId,
          expectedLabel: fieldStrings.LABEL,
          maximumCharacters: fieldStrings.MAXIMUM,
        });
      });

      describe(`${IS_CHARGING} label and input`, () => {
        const fieldId = IS_CHARGING;

        it('renders `yes` and `no` radio buttons in the correct order', () => {
          cy.assertYesNoRadiosOrder({ noRadioFirst: true });
        });

        it('renders `no` radio button', () => {
          cy.checkText(noRadio().label(), FIELD_VALUES.NO);

          cy.checkRadioInputNoAriaLabel(FIELDS.AGENT_SERVICE[fieldId].LABEL);
        });

        it('renders `yes` radio button', () => {
          yesRadio().input().should('exist');

          cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

          cy.checkRadioInputYesAriaLabel(FIELDS.AGENT_SERVICE[fieldId].LABEL);
        });
      });
    });

    describe('form submission', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      describe(`when selecting no for ${IS_CHARGING}`, () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.completeAndSubmitAgentServiceForm({});

          cy.assertUrl(checkYourAnswersUrl);
        });

        describe('when going back to the page', () => {
          it('should have the submitted values', () => {
            cy.navigateToUrl(url);

            cy.assertAgentServiceFieldValues({});
          });
        });
      });

      describe(`when selecting yes for ${IS_CHARGING}`, () => {
        it(`should redirect to ${AGENT_CHARGES}`, () => {
          cy.completeAndSubmitAgentServiceForm({ agentIsCharging: true });

          cy.assertUrl(agentChargesUrl);
        });

        describe('when going back to the page', () => {
          it('should have the submitted values', () => {
            cy.navigateToUrl(url);

            cy.assertAgentServiceFieldValues({ agentIsCharging: true });
          });
        });
      });
    });
  },
);

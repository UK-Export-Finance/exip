import { summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import checkSummaryList from '../../../../../../../commands/insurance/check-export-contract-summary-list';

const {
  ROOT,
  EXPORT_CONTRACT: {
    CHECK_YOUR_ANSWERS,
    AGENT_CHANGE,
    AGENT_DETAILS_CHANGE,
    AGENT_SERVICE_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  USING_AGENT: FIELD_ID,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - Agent - No to yes - As an Exporter, I want to be able to review my input regarding whether an agent helped me win the export contract, So that I can be assured I am providing UKEF with the right information', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let agentDetailsUrl;
  let agentServiceUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({
        isUsingAgent: false,
      });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      agentDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_DETAILS_CHANGE}`;
      agentServiceUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_SERVICE_CHANGE}`;

      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(FIELD_ID, () => {
    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHANGE, fieldId: FIELD_ID });
      });
    });

    describe('after changing the answer from no to yes', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${AGENT_DETAILS_CHANGE}, ${AGENT_SERVICE_CHANGE} and then ${CHECK_YOUR_ANSWERS} after completing (now required) ${AGENT_DETAILS_CHANGE} fields`, () => {
        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitAgentForm({
          isUsingAgent: true,
        });

        cy.assertUrl(`${agentDetailsUrl}#${FIELD_ID}-label`);

        cy.completeAndSubmitAgentDetailsForm({});

        cy.assertUrl(`${agentServiceUrl}#${FIELD_ID}-label`);

        cy.completeAndSubmitAgentServiceForm({ agentIsCharging: false });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
      });

      it(`should render new answers and change links for ${FIELD_ID} and all agent details fields`, () => {
        checkSummaryList[FIELD_ID]({ isYes: true });
        checkSummaryList[NAME]({ shouldRender: true });
        checkSummaryList[FULL_ADDRESS]({ shouldRender: true });
        checkSummaryList[COUNTRY_CODE]({ shouldRender: true });
      });
    });
  });
});

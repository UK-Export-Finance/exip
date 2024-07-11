import { autoCompleteField, field, summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import application from '../../../../../../../fixtures/application';
import { XAD } from '../../../../../../../fixtures/countries';

const {
  ROOT,
  EXPORT_CONTRACT: {
    CHECK_YOUR_ANSWERS,
    AGENT_DETAILS_CHANGE,
    AGENT_SERVICE_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

const NEW_COUNTRY_INPUT = XAD.NAME;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - Agent details - As an Exporter, I want to be able to review my input regarding whether an agent helped me win the export contract, So that I can be assured I am providing UKEF with the right information', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let agentServiceUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({
        isUsingAgent: true,
      });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
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

  describe(NAME, () => {
    const fieldId = NAME;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_DETAILS_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = `${application.EXPORT_CONTRACT.AGENT_DETAILS[fieldId]} additional text`;

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${AGENT_SERVICE_CHANGE} and then ${CHECK_YOUR_ANSWERS} after completing (now required) ${AGENT_SERVICE_CHANGE} fields`, () => {
        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).input(), newAnswer);

        cy.clickSubmitButton();

        cy.assertUrl(`${agentServiceUrl}#${fieldId}-label`);

        cy.completeAndSubmitAgentServiceForm({ agentIsCharging: false });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });

  describe(FULL_ADDRESS, () => {
    const fieldId = FULL_ADDRESS;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_DETAILS_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = 'Mock new agent details address';

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${AGENT_SERVICE_CHANGE} and then ${CHECK_YOUR_ANSWERS} after completing (now required) ${AGENT_SERVICE_CHANGE} fields`, () => {
        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).textarea(), newAnswer);

        cy.clickSubmitButton();

        const expectedUrl = `${agentServiceUrl}#${fieldId}-label`;
        cy.assertUrl(expectedUrl);

        cy.completeAndSubmitAgentServiceForm({ agentIsCharging: false });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });

  describe(COUNTRY_CODE, () => {
    const fieldId = COUNTRY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_DETAILS_CHANGE, fieldId });
      });
    });

    describe('form submission with a new destination/country answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${AGENT_SERVICE_CHANGE} and then ${CHECK_YOUR_ANSWERS} after completing (now required) ${AGENT_SERVICE_CHANGE} fields`, () => {
        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(autoCompleteField(fieldId).input(), NEW_COUNTRY_INPUT);

        cy.clickSubmitButton();

        const expectedUrl = `${agentServiceUrl}#${fieldId}-label`;
        cy.assertUrl(expectedUrl);

        cy.completeAndSubmitAgentServiceForm({ agentIsCharging: false });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new destination/country', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, NEW_COUNTRY_INPUT);
      });
    });
  });
});

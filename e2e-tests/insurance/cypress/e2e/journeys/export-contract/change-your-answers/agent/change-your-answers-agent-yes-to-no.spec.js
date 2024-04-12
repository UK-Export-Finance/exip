import { field, summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import checkSummaryList from '../../../../../../../commands/insurance/check-export-contract-summary-list';
import { checkAutocompleteInput } from '../../../../../../../shared-test-assertions';

const {
  ROOT,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS, AGENT_DETAILS, AGENT_CHANGE },
} = INSURANCE_ROUTES;

const {
  USING_AGENT: FIELD_ID,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - Agent - Yes to no - As an Exporter, I want to be able to review my input regarding whether an agent helped me win the export contract, So that I can be assured I am providing UKEF with the right information', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({
        isUsingAgent: true,
      });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      // cy.assertUrl(checkYourAnswersUrl);
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

    describe('after changing the answer from yes to no', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitAgentForm({
          isUsingAgent: false,
        });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
      });

      it(`should render new ${FIELD_ID} answer and change link, with no other agent details fields`, () => {
        checkSummaryList[FIELD_ID]({ isYes: false });
        checkSummaryList[NAME]({ shouldRender: false });
        checkSummaryList[FULL_ADDRESS]({ shouldRender: false });
        checkSummaryList[COUNTRY_CODE]({ shouldRender: false });
      });

      describe(`when changing the answer again from no to yes and going back to ${AGENT_DETAILS}`, () => {
        it('should have empty field values', () => {
          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitAgentForm({
            isUsingAgent: true,
          });

          cy.checkValue(field(NAME), '');

          cy.checkTextareaValue({
            fieldId: FULL_ADDRESS,
            expectedValue: '',
          });

          checkAutocompleteInput.checkEmptyResults(COUNTRY_CODE);
        });
      });
    });
  });
});

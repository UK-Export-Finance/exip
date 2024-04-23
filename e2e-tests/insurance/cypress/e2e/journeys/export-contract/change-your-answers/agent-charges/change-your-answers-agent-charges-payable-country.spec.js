import { autoCompleteField, summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { XAD } from '../../../../../../../fixtures/countries';

const {
  ROOT,
  EXPORT_CONTRACT: {
    CHECK_YOUR_ANSWERS,
    AGENT_CHARGES_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

const NEW_COUNTRY_INPUT = XAD.NAME;

const fieldId = PAYABLE_COUNTRY_CODE;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Export contract - Change your answers - Agent charges - ${PAYABLE_COUNTRY_CODE} - As an Exporter, I want to be able to review my input regarding the amount an agent is charging for helping me win my export contract, So that I can be assured I am providing UKEF with the right information`, () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({
        isUsingAgent: true,
        agentIsCharging: true,
        agentChargeMethodFixedSum: true,
      });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${AGENT_CHARGES_CHANGE}`, () => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(fieldId).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHARGES_CHANGE, fieldId });
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(fieldId).changeLink().click();

      cy.keyboardInput(autoCompleteField(fieldId).input(), NEW_COUNTRY_INPUT);

      cy.clickSubmitButton();
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
    });

    it('should render the new answer', () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, NEW_COUNTRY_INPUT);
    });
  });
});

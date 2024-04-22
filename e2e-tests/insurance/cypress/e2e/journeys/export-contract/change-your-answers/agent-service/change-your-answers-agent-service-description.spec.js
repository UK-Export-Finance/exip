import { field, summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import checkSummaryList from '../../../../../../../commands/insurance/check-export-contract-summary-list';
import application from '../../../../../../../fixtures/application';

const {
  ROOT,
  EXPORT_CONTRACT: {
    CHECK_YOUR_ANSWERS,
    AGENT_SERVICE_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  AGENT_SERVICE: { SERVICE_DESCRIPTION },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - Agent service - description - As an Exporter, I want to be able to review my input regarding whether an agent helped me win the export contract, So that I can be assured I am providing UKEF with the right information', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({
        isUsingAgent: true,
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

  describe(SERVICE_DESCRIPTION, () => {
    const fieldId = SERVICE_DESCRIPTION;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_SERVICE_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_SERVICE_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = 'additional text';
      const fullAnswer = `${application.EXPORT_CONTRACT.AGENT_SERVICE[fieldId]} ${newAnswer}`;

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(fieldId).textarea(), fullAnswer);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        checkSummaryList[fieldId]({ shouldRender: true, newAnswer });
      });
    });
  });
});

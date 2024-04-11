import { summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import checkSummaryList from '../../../../../../../commands/insurance/check-export-contract-summary-list';

const {
  ROOT,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS, PRIVATE_MARKET_CHANGE },
} = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { ATTEMPTED: FIELD_ID, DECLINED_DESCRIPTION },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - Private market - Yes to no - As an exporter, I want to check my answers for the questions concerning my goods/services, So that I ensure I am sending the right details regarding the product or service I am exporting', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({
        totalContractValueOverThreshold: true,
        attemptedPrivateMarketCover: true,
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

  describe(FIELD_ID, () => {
    describe('when clicking the `change` link', () => {
      it(`should redirect to ${PRIVATE_MARKET_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: PRIVATE_MARKET_CHANGE, fieldId: FIELD_ID });
      });
    });

    describe('after changing the answer from yes to no', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitPrivateMarketForm({
          attemptedPrivateMarketCover: false,
        });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
      });

      it(`should render the new answer and no ${DECLINED_DESCRIPTION} row`, () => {
        checkSummaryList[FIELD_ID]({ shouldRender: true, isYes: false });
        checkSummaryList[DECLINED_DESCRIPTION]({ shouldRender: false });
      });

      describe('when changing the answer again from no to yes', () => {
        it(`should have an empty ${DECLINED_DESCRIPTION} value`, () => {
          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitPrivateMarketForm({
            attemptedPrivateMarketCover: true,
          });

          cy.checkTextareaValue({
            fieldId: DECLINED_DESCRIPTION,
            expectedValue: '',
          });
        });
      });
    });
  });
});

import { summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import checkSummaryList from '../../../../../../../commands/insurance/check-export-contract-summary-list';

const {
  ROOT,
  EXPORT_CONTRACT: {
    CHECK_YOUR_ANSWERS,
    PRIVATE_MARKET_CHANGE,
    DECLINED_BY_PRIVATE_MARKET_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { ATTEMPTED: FIELD_ID, DECLINED_DESCRIPTION },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - Private market - No to yes - As an exporter, I want to check my answers for the questions concerning my goods/services, So that I ensure I am sending the right details regarding the product or service I am exporting', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let declinedByPrivateMarketUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({
        totalContractValueOverThreshold: true,
        attemptedPrivateMarketCover: false,
      });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      declinedByPrivateMarketUrl = `${baseUrl}${ROOT}/${referenceNumber}${DECLINED_BY_PRIVATE_MARKET_CHANGE}`;

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

    describe('after changing the answer from no to yes and completing (now required) fields for attempting the private market', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitPrivateMarketForm({
          attemptedPrivateMarketCover: true,
        });
      });

      it(`should redirect to ${DECLINED_BY_PRIVATE_MARKET_CHANGE}`, () => {
        const expectedUrl = `${declinedByPrivateMarketUrl}#${FIELD_ID}-label`;

        cy.assertUrl(expectedUrl);
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS} after completing (now required) ${DECLINED_BY_PRIVATE_MARKET_CHANGE} fields`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitPrivateMarketForm({
          attemptedPrivateMarketCover: true,
        });

        cy.completeAndSubmitDeclinedByPrivateMarketForm({});

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
      });

      it(`should render new answers and change links for ${FIELD_ID} and ${DECLINED_DESCRIPTION}`, () => {
        checkSummaryList[FIELD_ID]({ shouldRender: true, isYes: true });
        checkSummaryList[DECLINED_DESCRIPTION]({ shouldRender: true });
      });
    });
  });
});

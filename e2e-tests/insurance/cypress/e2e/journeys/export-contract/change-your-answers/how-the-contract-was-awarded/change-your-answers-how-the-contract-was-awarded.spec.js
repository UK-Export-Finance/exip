import { summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import checkSummaryList from '../../../../../../../commands/insurance/check-export-contract-summary-list';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/export-contract';
import application from '../../../../../../../fixtures/application';

const {
  ROOT,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS, HOW_WAS_THE_CONTRACT_AWARDED_CHANGE },
} = INSURANCE_ROUTES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD: FIELD_ID, OTHER_AWARD_METHOD },
} = FIELD_IDS;

const { DIRECT_AWARD, NEGOTIATED_CONTRACT, COMPETITIVE_BIDDING } = FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[FIELD_ID].OPTIONS;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Export contract - Change your answers - How the contract was awarded - As an Exporter, I want to be able to review my input regarding how the contract was awarded, So that I can be assured I am providing UKEF with the right information',
  () => {
    let referenceNumber;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeExportContractSection({});

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
        it(`should redirect to ${HOW_WAS_THE_CONTRACT_AWARDED_CHANGE}`, () => {
          cy.navigateToUrl(checkYourAnswersUrl);

          summaryList.field(FIELD_ID).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: HOW_WAS_THE_CONTRACT_AWARDED_CHANGE, fieldId: FIELD_ID });
        });
      });

      describe('after changing the answer from open tender to negotiated contract', () => {
        beforeEach(() => {
          cy.navigateToUrl(checkYourAnswersUrl);
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitHowWasTheContractAwardedForm({ negotiatedContract: true });

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
        });

        it(`should render new ${FIELD_ID} answer and change link`, () => {
          checkSummaryList[FIELD_ID]({ expectedValue: NEGOTIATED_CONTRACT.TEXT });
        });
      });

      describe('after changing the answer from negotiated contract to direct award', () => {
        beforeEach(() => {
          cy.navigateToUrl(checkYourAnswersUrl);
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitHowWasTheContractAwardedForm({ directAward: true });

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
        });

        it(`should render new ${FIELD_ID} answer and change link`, () => {
          checkSummaryList[FIELD_ID]({ expectedValue: DIRECT_AWARD.TEXT });
        });
      });

      describe('after changing the answer from direct award to competitive bidding', () => {
        beforeEach(() => {
          cy.navigateToUrl(checkYourAnswersUrl);
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitHowWasTheContractAwardedForm({ competitiveBidding: true });

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
        });

        it(`should render new ${FIELD_ID} answer and change link`, () => {
          checkSummaryList[FIELD_ID]({ expectedValue: COMPETITIVE_BIDDING.TEXT });
        });
      });

      describe('after changing the answer from competitive bidding to other', () => {
        beforeEach(() => {
          cy.navigateToUrl(checkYourAnswersUrl);
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitHowWasTheContractAwardedForm({ otherMethod: true });

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
        });

        it(`should render new ${FIELD_ID} answer and change link`, () => {
          checkSummaryList[FIELD_ID]({ expectedValue: application.EXPORT_CONTRACT[OTHER_AWARD_METHOD] });
        });
      });
    });
  },
);

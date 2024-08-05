import { summaryList } from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../../commands/insurance/check-export-contract-summary-list';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../../../content-strings/fields/insurance/export-contract';
import application from '../../../../../../../../fixtures/application';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT },
  EXPORT_CONTRACT: { HOW_WAS_THE_CONTRACT_AWARDED_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD: FIELD_ID, OTHER_AWARD_METHOD },
} = FIELD_IDS;

const { DIRECT_AWARD, NEGOTIATED_CONTRACT, COMPETITIVE_BIDDING, OPEN_TENDER, OTHER } = FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[FIELD_ID].OPTIONS;

const baseUrl = Cypress.config('baseUrl');

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

context(
  'Insurance - Change your answers - How the contract was awarded - As an Exporter, I want to be able to review my input regarding how the contract was awarded, So that I can be assured I am providing UKEF with the right information',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({
          referenceNumber,
        });

        task.link().click();

        // To get past previous "Check your answers" pages
        cy.completeAndSubmitMultipleCheckYourAnswers({ count: 3 });

        url = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT}`;

        cy.assertUrl(url);
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
        it(`should redirect to ${HOW_WAS_THE_CONTRACT_AWARDED_CHECK_AND_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(FIELD_ID).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: HOW_WAS_THE_CONTRACT_AWARDED_CHECK_AND_CHANGE, fieldId: FIELD_ID });
        });
      });

      describe(`after changing the answer from ${OPEN_TENDER.TEXT} to ${NEGOTIATED_CONTRACT.TEXT}`, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${EXPORT_CONTRACT}`, () => {
          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitHowWasTheContractAwardedForm({ negotiatedContract: true });

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId: FIELD_ID });
        });

        it(`should render new ${FIELD_ID} answer and change link`, () => {
          checkSummaryList[FIELD_ID]({ expectedValue: NEGOTIATED_CONTRACT.TEXT });
        });
      });

      describe(`after changing the answer from ${NEGOTIATED_CONTRACT.TEXT} to ${DIRECT_AWARD.TEXT}`, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${EXPORT_CONTRACT}`, () => {
          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitHowWasTheContractAwardedForm({ directAward: true });

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId: FIELD_ID });
        });

        it(`should render new ${FIELD_ID} answer and change link, with no other agent service charge fields`, () => {
          checkSummaryList[FIELD_ID]({ expectedValue: DIRECT_AWARD.TEXT });
        });
      });

      describe(`after changing the answer from ${DIRECT_AWARD.TEXT} to ${COMPETITIVE_BIDDING.TEXT}`, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${EXPORT_CONTRACT}`, () => {
          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitHowWasTheContractAwardedForm({ competitiveBidding: true });

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId: FIELD_ID });
        });

        it(`should render new ${FIELD_ID} answer and change link`, () => {
          checkSummaryList[FIELD_ID]({ expectedValue: COMPETITIVE_BIDDING.TEXT });
        });
      });

      describe(`after changing the answer from ${COMPETITIVE_BIDDING.TEXT} to ${OTHER.TEXT}`, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it(`should redirect to ${EXPORT_CONTRACT}`, () => {
          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitHowWasTheContractAwardedForm({ otherMethod: true });

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId: FIELD_ID });
        });

        it(`should render new ${FIELD_ID} answer and change link`, () => {
          checkSummaryList[FIELD_ID]({ expectedValue: application.EXPORT_CONTRACT[OTHER_AWARD_METHOD] });
        });
      });
    });
  },
);

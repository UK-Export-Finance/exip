import { status, summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import checkSummaryList from '../../../../../../../commands/insurance/check-your-buyer-summary-list';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { YOUR_BUYER },
  YOUR_BUYER: { CONNECTION_WITH_BUYER_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const { CONNECTION_WITH_BUYER: FIELD_ID, CONNECTION_WITH_BUYER_DESCRIPTION } = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  `Insurance - Check your answers - Your buyer - Connection with buyer - ${FIELD_ID} - No to yes - As an exporter, I want to change my answers to the connection with buyer section`,
  () => {
    let referenceNumber;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({ hasConnectionToBuyer: false });

        cy.clickTaskCheckAnswers();

        // To get past "Your business" check your answers page
        cy.completeAndSubmitMultipleCheckYourAnswers({ count: 1 });

        checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUYER}`;

        cy.assertUrl(checkYourAnswersUrl);
      });
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(checkYourAnswersUrl);
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${CONNECTION_WITH_BUYER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CONNECTION_WITH_BUYER_CHECK_AND_CHANGE, fieldId: FIELD_ID });
      });
    });

    describe('after changing the answer from no to yes', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer: true });
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId: FIELD_ID });
      });

      it(`should render new ${FIELD_ID} answer and change link, with other buyer connection fields`, () => {
        checkSummaryList[FIELD_ID]({ isYes: true });
        checkSummaryList[CONNECTION_WITH_BUYER_DESCRIPTION]({ shouldRender: true });
      });

      it('should retain a `completed` status tag', () => {
        cy.checkTaskStatusCompleted(status);
      });
    });
  },
);

import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { summaryList } from '../../../../../../pages/shared';
import checkSummaryList from '../../../../../../commands/insurance/check-your-buyer-summary-list';

const {
  ROOT,
  YOUR_BUYER: {
    CONNECTION_WITH_BUYER_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const {
  CONNECTION_WITH_BUYER: FIELD_ID,
  CONNECTION_WITH_BUYER_DESCRIPTION,
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Your buyer - Change your answers - Connection with buyer - ${FIELD_ID} - No to yes`, () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({ hasConnectionToBuyer: false });
      cy.completeAndSubmitTradedWithBuyerForm({});
      cy.completeAndSubmitBuyerFinancialInformationForm({});

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${CONNECTION_WITH_BUYER_CHANGE}`, () => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CONNECTION_WITH_BUYER_CHANGE, fieldId: FIELD_ID });
    });
  });

  describe('after changing the answer from no to yes', () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitConnectionToTheBuyerForm({ hasConnectionToBuyer: true });
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
    });

    it(`should render new ${FIELD_ID} answer and change link, with other buyer fields`, () => {
      checkSummaryList[FIELD_ID]({ isYes: true });
      checkSummaryList[CONNECTION_WITH_BUYER_DESCRIPTION]({ shouldRender: true });
    });
  });
});

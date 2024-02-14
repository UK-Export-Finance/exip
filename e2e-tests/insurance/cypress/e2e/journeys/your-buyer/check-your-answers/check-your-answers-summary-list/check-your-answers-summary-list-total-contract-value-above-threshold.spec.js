import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as YOUR_BUYER_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import checkSummaryList from '../../../../../../../commands/insurance/check-your-buyer-summary-list';

const {
  ROOT,
  YOUR_BUYER: {
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const {
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
} = YOUR_BUYER_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Check your answers - Summary list - your buyer - Total contract value above threshold', () => {
  let referenceNumber;
  let url;

  describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} as no`, () => {
    before(() => {
      cy.deleteAccount();

      cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.startInsuranceYourBuyerSection({});

        cy.completeAndSubmitCompanyOrOrganisationForm({});
        cy.completeAndSubmitConnectionToTheBuyerForm({});
        cy.completeAndSubmitTradedWithBuyerForm({});
        cy.completeAndSubmitCreditInsuranceCoverForm({});
        cy.completeAndSubmitBuyerFinancialInformationForm({});

        url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      });
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    it(`should render a ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} summary list row`, () => {
      checkSummaryList[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({});
    });

    it(`should not render a ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} summary list row`, () => {
      checkSummaryList[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({ shouldRender: false });
    });
  });

  describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} as yes`, () => {
    before(() => {
      cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.startInsuranceYourBuyerSection({});

        cy.completeAndSubmitCompanyOrOrganisationForm({});
        cy.completeAndSubmitConnectionToTheBuyerForm({ hasConnectionToBuyer: true });
        cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });
        cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true, failedToPay: true });
        cy.completeAndSubmitCreditInsuranceCoverForm({ hasHadCreditInsuranceCover: true });
        cy.completeAndSubmitBuyerFinancialInformationForm({});

        url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      });
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    it(`should render a ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} summary list row`, () => {
      checkSummaryList[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({ isYes: true });
    });

    it(`should render a ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} summary list row`, () => {
      checkSummaryList[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({});
    });
  });
});

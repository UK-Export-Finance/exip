import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as YOUR_BUYER_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import checkSummaryList from '../../../../../../../commands/insurance/check-your-buyer-summary-list';

const {
  ROOT,
  YOUR_BUYER: { CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    COUNTRY,
    REGISTRATION_NUMBER,
    WEBSITE,
  },
  CONNECTION_WITH_BUYER,
  CONNECTION_WITH_BUYER_DESCRIPTION,
  TRADED_WITH_BUYER,
  OUTSTANDING_PAYMENTS,
  FAILED_PAYMENTS,
  TOTAL_AMOUNT_OVERDUE,
  TOTAL_OUTSTANDING_PAYMENTS,
  HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  HAS_BUYER_FINANCIAL_ACCOUNTS,
} = YOUR_BUYER_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your buyer - Check your answers - Summary list - Your buyer - Application over total contract value threshold, all optional buyer fields',
  () => {
    let referenceNumber;
    let url;

    describe(`${CONNECTION_WITH_BUYER} as no`, () => {
      before(() => {
        cy.deleteAccount();

        cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
          referenceNumber = refNumber;

          cy.completeBuyerSection({
            hasConnectionToBuyer: true,
            exporterHasTradedWithBuyer: true,
            fullyPopulatedBuyerTradingHistory: true,
            hasHadCreditInsuranceCoverWithBuyer: true,
            exporterHasBuyerFinancialAccounts: true,
            totalContractValueOverThreshold: true,
          });

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

      it(`should render a ${NAME} summary list row`, () => {
        checkSummaryList[NAME]({});
      });

      it(`should render a ${ADDRESS} summary list row`, () => {
        checkSummaryList[ADDRESS]();
      });

      it(`should render a ${COUNTRY} summary list row`, () => {
        checkSummaryList[COUNTRY]();
      });

      it(`should render a ${REGISTRATION_NUMBER} summary list row`, () => {
        checkSummaryList[REGISTRATION_NUMBER]();
      });

      it(`should render a ${WEBSITE} summary list row`, () => {
        checkSummaryList[WEBSITE]();
      });

      it(`should render a ${CONNECTION_WITH_BUYER} summary list row`, () => {
        checkSummaryList[CONNECTION_WITH_BUYER]({ isYes: true });
      });

      it(`should render a ${CONNECTION_WITH_BUYER_DESCRIPTION} summary list row`, () => {
        checkSummaryList[CONNECTION_WITH_BUYER_DESCRIPTION]({ shouldRender: true });
      });

      it(`should render a ${TRADED_WITH_BUYER} summary list row`, () => {
        checkSummaryList[TRADED_WITH_BUYER]({ isYes: true });
      });

      it(`should render a ${OUTSTANDING_PAYMENTS} summary list row`, () => {
        checkSummaryList[OUTSTANDING_PAYMENTS]({ shouldRender: true, isYes: true });
      });

      it(`should render a ${TOTAL_AMOUNT_OVERDUE} summary list row`, () => {
        checkSummaryList[TOTAL_AMOUNT_OVERDUE]({ shouldRender: true });
      });

      it(`should render a ${TOTAL_OUTSTANDING_PAYMENTS} summary list row`, () => {
        checkSummaryList[TOTAL_OUTSTANDING_PAYMENTS]({ shouldRender: true });
      });

      it(`should render a ${FAILED_PAYMENTS} summary list row`, () => {
        checkSummaryList[FAILED_PAYMENTS]({ shouldRender: true, isYes: true });
      });

      it(`should render a ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} summary list row`, () => {
        checkSummaryList[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({ shouldRender: true, isYes: true });
      });

      it(`should render a ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} summary list row`, () => {
        checkSummaryList[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({ shouldRender: true });
      });

      it(`should render a ${HAS_BUYER_FINANCIAL_ACCOUNTS} summary list row`, () => {
        checkSummaryList[HAS_BUYER_FINANCIAL_ACCOUNTS]({ isYes: true });
      });
    });
  },
);

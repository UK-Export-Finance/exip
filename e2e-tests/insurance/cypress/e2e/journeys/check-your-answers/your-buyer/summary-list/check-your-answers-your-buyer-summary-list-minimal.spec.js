import checkSummaryList from '../../../../../../../commands/insurance/check-your-buyer-summary-list';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { YOUR_BUYER },
} = INSURANCE_ROUTES;

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS, COUNTRY, REGISTRATION_NUMBER, WEBSITE },
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
} = INSURANCE_FIELD_IDS.YOUR_BUYER;

const { CURRENCY_CODE } = INSURANCE_FIELD_IDS.CURRENCY;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Your buyer page - Summary list - application below total contract value threshold, no optional buyer fields', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({});

      cy.clickTaskCheckAnswers();

      // To get past "Your business" check your answers page
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 1 });

      url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUYER}`;

      cy.assertUrl(url);
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
    checkSummaryList[CONNECTION_WITH_BUYER]({});
  });

  it(`should NOT render a ${CONNECTION_WITH_BUYER_DESCRIPTION} summary list row`, () => {
    checkSummaryList[CONNECTION_WITH_BUYER_DESCRIPTION]({ shouldRender: false });
  });

  it(`should render a ${TRADED_WITH_BUYER} summary list row`, () => {
    checkSummaryList[TRADED_WITH_BUYER]({ isYes: false });
  });

  it(`should NOT render a ${OUTSTANDING_PAYMENTS} summary list row`, () => {
    checkSummaryList[OUTSTANDING_PAYMENTS]({ shouldRender: false });
  });

  it(`should NOT render a ${CURRENCY_CODE} summary list row`, () => {
    checkSummaryList[CURRENCY_CODE]({ shouldRender: false });
  });

  it(`should NOT render a ${TOTAL_AMOUNT_OVERDUE} summary list row`, () => {
    checkSummaryList[TOTAL_AMOUNT_OVERDUE]({ shouldRender: false });
  });

  it(`should NOT render a ${TOTAL_OUTSTANDING_PAYMENTS} summary list row`, () => {
    checkSummaryList[TOTAL_OUTSTANDING_PAYMENTS]({ shouldRender: false });
  });

  it(`should NOT render a ${FAILED_PAYMENTS} summary list row`, () => {
    checkSummaryList[FAILED_PAYMENTS]({ shouldRender: false });
  });

  it(`should NOT render a ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} summary list row`, () => {
    checkSummaryList[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({ shouldRender: false });
  });

  it(`should NOT render a ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} summary list row`, () => {
    checkSummaryList[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({ shouldRender: false });
  });

  it(`should render a ${HAS_BUYER_FINANCIAL_ACCOUNTS} summary list row`, () => {
    checkSummaryList[HAS_BUYER_FINANCIAL_ACCOUNTS]({ isYes: false });
  });
});

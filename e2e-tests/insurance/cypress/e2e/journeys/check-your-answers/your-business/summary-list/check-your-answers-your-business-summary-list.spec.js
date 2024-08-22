import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-your-business-summary-list';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS },
} = INSURANCE_ROUTES;

const {
  YOUR_COMPANY: { TRADING_ADDRESS, HAS_DIFFERENT_TRADING_NAME, WEBSITE, PHONE_NUMBER },
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER, TURNOVER_CURRENCY_CODE },
  HAS_CREDIT_CONTROL,
} = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Your business - Summary list', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      cy.clickTaskCheckAnswers();

      url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

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

  it(`should render a ${HAS_DIFFERENT_TRADING_NAME} summary list row`, () => {
    checkSummaryList[HAS_DIFFERENT_TRADING_NAME]({});
  });

  it(`should render a ${TRADING_ADDRESS} summary list row`, () => {
    checkSummaryList[TRADING_ADDRESS]({});
  });

  it(`should render a ${WEBSITE} summary list row`, () => {
    checkSummaryList[WEBSITE]();
  });

  it(`should render a ${PHONE_NUMBER} summary list row`, () => {
    checkSummaryList[PHONE_NUMBER]();
  });

  it(`should render a ${GOODS_OR_SERVICES} summary list row`, () => {
    checkSummaryList[GOODS_OR_SERVICES]();
  });

  it(`should render a ${YEARS_EXPORTING} summary list row`, () => {
    checkSummaryList[YEARS_EXPORTING]();
  });

  it(`should render a ${EMPLOYEES_UK} summary list row`, () => {
    checkSummaryList[EMPLOYEES_UK]();
  });

  it(`should render a ${TURNOVER_CURRENCY_CODE} summary list row`, () => {
    checkSummaryList[TURNOVER_CURRENCY_CODE]();
  });

  it(`should render a ${ESTIMATED_ANNUAL_TURNOVER} summary list row`, () => {
    checkSummaryList[ESTIMATED_ANNUAL_TURNOVER]();
  });

  it(`should render a ${PERCENTAGE_TURNOVER} summary list row`, () => {
    checkSummaryList[PERCENTAGE_TURNOVER]();
  });

  it(`should render a ${HAS_CREDIT_CONTROL} summary list row`, () => {
    checkSummaryList[HAS_CREDIT_CONTROL]({ isYes: false });
  });
});

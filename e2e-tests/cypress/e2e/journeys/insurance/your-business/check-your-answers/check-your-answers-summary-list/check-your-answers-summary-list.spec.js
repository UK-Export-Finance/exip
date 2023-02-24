import partials from '../../../../../partials';
import { FIELD_IDS, ROUTES } from '../../../../../../../constants';
import checkSummaryList from '../../../../../../support/insurance/check-your-business-summary-list';

const {
  INSURANCE: {
    EXPORTER_BUSINESS: {
      COMPANY_HOUSE: {
        COMPANY_NAME,
        COMPANY_NUMBER,
        COMPANY_ADDRESS,
        COMPANY_INCORPORATED,
        COMPANY_SIC,
        FINANCIAL_YEAR_END_DATE,
      },
      YOUR_COMPANY: {
        TRADING_ADDRESS,
        TRADING_NAME,
        WEBSITE,
        PHONE_NUMBER,
      },
      NATURE_OF_YOUR_BUSINESS: {
        GOODS_OR_SERVICES,
        YEARS_EXPORTING,
        EMPLOYEES_INTERNATIONAL,
        EMPLOYEES_UK,
      },
      TURNOVER: {
        ESTIMATED_ANNUAL_TURNOVER,
        PERCENTAGE_TURNOVER,
      },
    },
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

context('Insurance - Your business - Check your answers - Summary list - your business', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();
    cy.completeAndSubmitNatureOfYourBusiness();
    cy.completeAndSubmitTurnoverForm();
    cy.completeAndSubmitBrokerForm();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it(`should render a ${COMPANY_NUMBER} summary list row`, () => {
    checkSummaryList[COMPANY_NUMBER]();
  });

  it(`should render a ${COMPANY_NAME} summary list row`, () => {
    checkSummaryList[COMPANY_NAME]();
  });

  it(`should render a ${COMPANY_ADDRESS} summary list row`, () => {
    checkSummaryList[COMPANY_ADDRESS]();
  });

  it(`should render a ${COMPANY_INCORPORATED} summary list row`, () => {
    checkSummaryList[COMPANY_INCORPORATED]();
  });

  it(`should render a ${COMPANY_SIC} summary list row`, () => {
    checkSummaryList[COMPANY_SIC]();
  });

  it(`should render a ${FINANCIAL_YEAR_END_DATE} summary list row`, () => {
    checkSummaryList[FINANCIAL_YEAR_END_DATE]();
  });

  it(`should render a ${TRADING_NAME} summary list row`, () => {
    checkSummaryList[TRADING_NAME]();
  });

  it(`should render a ${TRADING_ADDRESS} summary list row`, () => {
    checkSummaryList[TRADING_ADDRESS]();
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

  it(`should render a ${EMPLOYEES_INTERNATIONAL} summary list row`, () => {
    checkSummaryList[EMPLOYEES_INTERNATIONAL]();
  });

  it(`should render a ${ESTIMATED_ANNUAL_TURNOVER} summary list row`, () => {
    checkSummaryList[ESTIMATED_ANNUAL_TURNOVER]();
  });

  it(`should render a ${PERCENTAGE_TURNOVER} summary list row`, () => {
    checkSummaryList[PERCENTAGE_TURNOVER]();
  });
});

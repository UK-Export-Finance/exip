import partials from '../../../../../../../partials';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-your-business-summary-list';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUSINESS,
  },
} = INSURANCE_ROUTES;

const {
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
  CONTACT: {
    NAME: CONTACT_NAME,
    POSITION,
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
  BROKER: {
    USING_BROKER,
    NAME,
    ADDRESS_LINE_1,
    EMAIL,
  },
} = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS;

const { EMAIL: ACCOUNT_EMAIL } = INSURANCE_FIELD_IDS.ACCOUNT;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

context('Insurance - Check your answers - Your business - Summary list', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber, usingBroker: true });

      task.link().click();

      // To get past "Eligibility" check your answers page
      cy.submitCheckYourAnswersForm();

      // To get past "Policy and exports" check your answers page
      cy.submitCheckYourAnswersForm();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

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

  it(`should render a ${CONTACT_NAME} summary list row`, () => {
    checkSummaryList[`contact-${CONTACT_NAME}`]();
  });

  it(`should render a ${ACCOUNT_EMAIL} summary list row`, () => {
    checkSummaryList[`contact-${ACCOUNT_EMAIL}`]();
  });

  it(`should render a ${POSITION} summary list row`, () => {
    checkSummaryList[POSITION]();
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

  it(`should render a ${USING_BROKER} summary list row`, () => {
    checkSummaryList[USING_BROKER]();
  });

  it(`should render a ${NAME} summary list row`, () => {
    checkSummaryList[NAME]();
  });

  it(`should render a ${ADDRESS_LINE_1} summary list row`, () => {
    checkSummaryList[ADDRESS_LINE_1]();
  });

  it(`should render a ${EMAIL} summary list row`, () => {
    checkSummaryList[EMAIL]();
  });
});

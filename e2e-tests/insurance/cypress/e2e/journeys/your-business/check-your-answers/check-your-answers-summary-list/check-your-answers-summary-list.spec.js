import { FIELD_IDS, ROUTES } from '../../../../../../../constants';
import checkSummaryList from '../../../../../../../commands/insurance/check-your-business-summary-list';

const {
  ROOT,
  EXPORTER_BUSINESS: { CHECK_YOUR_ANSWERS },
} = ROUTES.INSURANCE;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: {
      YOUR_COMPANY: { HAS_DIFFERENT_TRADING_ADDRESS, HAS_DIFFERENT_TRADING_NAME, WEBSITE, PHONE_NUMBER },
      NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
      TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER, TURNOVER_CURRENCY_CODE },
      HAS_CREDIT_CONTROL,
    },
  },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Check your answers - Summary list - your business', () => {
  let referenceNumber;
  let url;

  describe(`when ${HAS_DIFFERENT_TRADING_ADDRESS} is 'no'`, () => {
    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBusinessForms({ stopSubmittingAfter: 'creditControl', hasCreditControlProcess: true });

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

    it(`should render a ${HAS_DIFFERENT_TRADING_NAME} summary list row`, () => {
      checkSummaryList[HAS_DIFFERENT_TRADING_NAME]({});
    });

    it(`should render a ${HAS_DIFFERENT_TRADING_ADDRESS} summary list row`, () => {
      checkSummaryList[HAS_DIFFERENT_TRADING_ADDRESS]({});
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
      checkSummaryList[HAS_CREDIT_CONTROL]({ isYes: true });
    });
  });

  describe(`when ${HAS_DIFFERENT_TRADING_ADDRESS} is 'yes'`, () => {
    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBusinessForms({ stopSubmittingAfter: 'creditControl', differentTradingAddress: true });

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

    it(`should render a ${HAS_DIFFERENT_TRADING_ADDRESS} summary list row with the full address`, () => {
      checkSummaryList[HAS_DIFFERENT_TRADING_ADDRESS]({ differentTradingAddress: true });
    });
  });

  describe(`when ${HAS_DIFFERENT_TRADING_NAME} is 'yes'`, () => {
    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBusinessForms({ stopSubmittingAfter: 'creditControl', differentTradingName: true });

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

    it(`should render a ${HAS_DIFFERENT_TRADING_NAME} summary list row with the different name`, () => {
      checkSummaryList[HAS_DIFFERENT_TRADING_NAME]({ differentTradingName: true });
    });
  });
});

import {
  SYMBOLS, USD_CURRENCY_CODE, EUR_CURRENCY_CODE, JPY_CURRENCY_CODE,
} from '../../../../../../fixtures/currencies';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/business';

const {
  TURNOVER: {
    ESTIMATED_ANNUAL_TURNOVER,
  },
} = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    TURNOVER_ROOT,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Turnover page - As an Exporter I want to change the currency of my annual turnover', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();

      url = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER_ROOT}`;

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

  describe('when not selecting a currency', () => {
    it(`should display ${SYMBOLS.GBP} as the prefix`, () => {
      cy.assertPrefix({ fieldId: ESTIMATED_ANNUAL_TURNOVER, value: SYMBOLS.GBP });
    });
  });

  describe(`when selecting ${USD_CURRENCY_CODE} as the currency code`, () => {
    it(`should display ${SYMBOLS.USD} as the prefix`, () => {
      cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: USD_CURRENCY_CODE });
      cy.assertPrefix({ fieldId: ESTIMATED_ANNUAL_TURNOVER, value: SYMBOLS.USD });
    });
  });

  describe(`when selecting ${JPY_CURRENCY_CODE} as the currency code`, () => {
    it(`should display ${SYMBOLS.JPY} as the prefix`, () => {
      cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: JPY_CURRENCY_CODE });
      cy.assertPrefix({ fieldId: ESTIMATED_ANNUAL_TURNOVER, value: SYMBOLS.JPY });
    });
  });

  describe(`when selecting ${EUR_CURRENCY_CODE} as the currency code`, () => {
    it(`should display ${SYMBOLS.EUR} as the prefix`, () => {
      cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: EUR_CURRENCY_CODE });
      cy.assertPrefix({ fieldId: ESTIMATED_ANNUAL_TURNOVER, value: SYMBOLS.EUR });
    });
  });

  describe('when selecting an alternate currency as the currency code', () => {
    it('should not display a prefix', () => {
      cy.completeAndSubmitAlternativeCurrencyForm({ alternativeCurrency: true });
      cy.assertPrefix({ fieldId: ESTIMATED_ANNUAL_TURNOVER });
    });
  });
});

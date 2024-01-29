import { headingCaption } from '../../../../../../pages/shared';
import {
  BUTTONS, ERROR_MESSAGES, FIELDS, PAGES,
} from '../../../../../../content-strings';
import { YOUR_BUYER_FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import assertAlternativeCurrencyForm from '../../../../../../commands/insurance/assert-alternative-currency-form';
import {
  EUR_CURRENCY_CODE, GBP_CURRENCY_CODE, USD_CURRENCY_CODE, JPY_CURRENCY_CODE,
} from '../../../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.ROOT;

const {
  ROOT,
  YOUR_BUYER: { ALTERNATIVE_CURRENCY, TRADING_HISTORY },
} = INSURANCE_ROUTES;

const { CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE } } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: ERRORS,
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

const {
  radios, alternativeCurrencyInput, rendersAlternativeCurrencies, doesNotRenderSupportedCurrencies,
  rendersAlternativeCurrencyValidationError, submitRadioAndAssertUrl, submitAndAssertRadioIsChecked,
  submitAlternativeCurrencyAndAssertUrl, submitAlternativeCurrencyAndAssertInput,
} = assertAlternativeCurrencyForm({
  legend: YOUR_BUYER_FIELDS[CURRENCY_CODE].LEGEND,
  alternativeCurrencyText: FIELDS[ALTERNATIVE_CURRENCY_CODE].TEXT,
  errors: ERRORS,
});

context('Insurance - Your Buyer - Alternative currency - As an exporter, I want to provide the details on trading history with the buyer of my export trade, So that UKEF can gain clarity on whether I have trading history with the buyer as part of due diligence', () => {
  let referenceNumber;
  let url;
  let tradingHistoryUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${ALTERNATIVE_CURRENCY}`;
      tradingHistoryUrl = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;

      cy.navigateToUrl(url);

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: YOUR_BUYER_FIELDS[CURRENCY_CODE].LEGEND,
      currentHref: `${ROOT}/${referenceNumber}${ALTERNATIVE_CURRENCY}`,
      backLink: `${ROOT}/${referenceNumber}${ALTERNATIVE_CURRENCY}#`,
      submitButtonCopy: BUTTONS.CONFIRM,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders alternative currency radios', () => {
      radios();
    });

    it('renders alternative currency input', () => {
      alternativeCurrencyInput();
    });

    it('should not render invalid inputs or radio currencies in alternative currency input', () => {
      doesNotRenderSupportedCurrencies();
    });

    it('should render valid alternate currencies in alternative currency input', () => {
      rendersAlternativeCurrencies();
    });
  });

  describe('form submission', () => {
    describe('when selecting the alternative currency radio but not entering an alternative currency via the autocomplete ', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render validation errors', () => {
        rendersAlternativeCurrencyValidationError();
      });
    });

    describe('when submitting a supported currency', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      describe(EUR_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl(EUR_CURRENCY_CODE, tradingHistoryUrl);
        });

        it('should display the submitted answer', () => {
          submitAndAssertRadioIsChecked(EUR_CURRENCY_CODE, url);
        });
      });

      describe(GBP_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl(GBP_CURRENCY_CODE, tradingHistoryUrl);
        });

        it('should display the submitted answer', () => {
          submitAndAssertRadioIsChecked(GBP_CURRENCY_CODE, url);
        });
      });

      describe(USD_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl(USD_CURRENCY_CODE, tradingHistoryUrl);
        });

        it('should display the submitted answer', () => {
          submitAndAssertRadioIsChecked(USD_CURRENCY_CODE, url);
        });
      });

      describe(JPY_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl(JPY_CURRENCY_CODE, tradingHistoryUrl);
        });

        it('should display the submitted answer', () => {
          submitAndAssertRadioIsChecked(JPY_CURRENCY_CODE, url);
        });
      });
    });

    describe('when submitting an alternative currency', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should redirect to the next page', () => {
        submitAlternativeCurrencyAndAssertUrl(tradingHistoryUrl);
      });

      it('should display the submitted answer', () => {
        submitAlternativeCurrencyAndAssertInput(url);
      });
    });
  });
});

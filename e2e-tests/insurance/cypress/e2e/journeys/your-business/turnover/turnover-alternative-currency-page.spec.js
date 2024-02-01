import { headingCaption, field as fieldSelector } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import {
  BUTTONS, ERROR_MESSAGES, FIELDS, PAGES,
} from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import assertAlternativeCurrencyForm from '../../../../../../commands/insurance/assert-alternative-currency-form';
import {
  EUR_CURRENCY_CODE, GBP_CURRENCY_CODE, USD_CURRENCY_CODE, JPY_CURRENCY_CODE,
} from '../../../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ALTERNATIVE_CURRENCY;

const {
  ROOT,
  EXPORTER_BUSINESS: { TURNOVER_ROOT, TURNOVER_ALTERNATIVE_CURRENCY },
} = INSURANCE_ROUTES;

const { CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE } } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: ERRORS,
  },
} = ERROR_MESSAGES;

const {
  radios, assertGbpCurrencyCheckedByDefault, alternativeCurrencyInput, rendersAlternativeCurrencies, doesNotRenderSupportedCurrencies,
  rendersAlternativeCurrencyValidationError, submitRadioAndAssertUrl,
  submitAndAssertRadioIsChecked, submitAlternativeCurrencyAndAssertUrl, submitAlternativeCurrencyAndAssertInput,
} = assertAlternativeCurrencyForm({
  legend: EXPORTER_BUSINESS_FIELDS[CURRENCY_CODE].LEGEND,
  alternativeCurrencyText: FIELDS[ALTERNATIVE_CURRENCY_CODE].TEXT,
  errors: ERRORS,
});

const baseUrl = Cypress.config('baseUrl');

const fieldSelectors = {
  currencyCode: fieldSelector(CURRENCY_CODE),
  gbp: fieldSelector(`${CURRENCY_CODE}-${GBP_CURRENCY_CODE}`),
  alternativeCurrencyCode: fieldSelector(ALTERNATIVE_CURRENCY_CODE),
};

context('Insurance - Your business - Turnover - Alternative currency page - As an Exporter I want to enter the turnover of my business so that UKEF can have clarity on my business financial position when processing my Export Insurance Application', () => {
  let referenceNumber;
  let url;
  let turnoverUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();

      partials.provideAlternativeCurrencyLink().click();

      url = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER_ALTERNATIVE_CURRENCY}`;
      turnoverUrl = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER_ROOT}`;

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
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${TURNOVER_ALTERNATIVE_CURRENCY}`,
      backLink: `${ROOT}/${referenceNumber}${TURNOVER_ROOT}`,
      submitButtonCopy: BUTTONS.CONFIRM,
      assertSaveAndBackButtonDoesNotExist: true,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it(`should render ${GBP_CURRENCY_CODE} checked by default`, () => {
      assertGbpCurrencyCheckedByDefault();
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
    describe('when selecting the alternative currency radio but not entering an alternative currency via the autocomplete input', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render validation errors', () => {
        rendersAlternativeCurrencyValidationError();
      });
    });

    describe(`when selecting ${ALTERNATIVE_CURRENCY_CODE} and not choosing a currency`, () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        fieldSelectors.alternativeCurrencyCode.input().click();
        cy.clickSubmitButton();
      });

      it('should render validation errors', () => {
        cy.checkText(
          partials.errorSummaryListItems().first(),
          ERRORS[ALTERNATIVE_CURRENCY_CODE].IS_EMPTY,
        );

        cy.checkText(
          fieldSelectors.alternativeCurrencyCode.errorMessage(),
          `Error: ${ERRORS[ALTERNATIVE_CURRENCY_CODE].IS_EMPTY}`,
        );
      });
    });

    describe('when submitting a supported currency', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      describe(EUR_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl(EUR_CURRENCY_CODE, turnoverUrl);
        });

        it('should render the submitted answer when going back to the page', () => {
          submitAndAssertRadioIsChecked(EUR_CURRENCY_CODE, url);
        });
      });

      describe(GBP_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl(GBP_CURRENCY_CODE, turnoverUrl);
        });

        it('should render the submitted answer when going back to the page', () => {
          submitAndAssertRadioIsChecked(GBP_CURRENCY_CODE, url);
        });
      });

      describe(USD_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl(USD_CURRENCY_CODE, turnoverUrl);
        });

        it('should render the submitted answer when going back to the page', () => {
          submitAndAssertRadioIsChecked(USD_CURRENCY_CODE, url);
        });
      });

      describe(JPY_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl(JPY_CURRENCY_CODE, turnoverUrl);
        });

        it('should render the submitted answer when going back to the page', () => {
          submitAndAssertRadioIsChecked(JPY_CURRENCY_CODE, url);
        });
      });
    });

    describe('when submitting an alternative currency', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should redirect to the next page', () => {
        submitAlternativeCurrencyAndAssertUrl(turnoverUrl);
      });

      it('should render the submitted answer when going back to the page', () => {
        submitAlternativeCurrencyAndAssertInput(url);
      });
    });
  });
});

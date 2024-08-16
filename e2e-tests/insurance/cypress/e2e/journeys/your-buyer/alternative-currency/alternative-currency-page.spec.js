import { headingCaption } from '../../../../../../pages/shared';
import { BUTTONS, ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { YOUR_BUYER_FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { assertCurrencyFormFields } from '../../../../../../shared-test-assertions';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.ROOT;

const {
  ROOT,
  YOUR_BUYER: { ALTERNATIVE_CURRENCY, TRADING_HISTORY },
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: { YOUR_BUYER: ERRORS },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your buyer - Alternative currency - As an exporter, I want to provide the details on trading history with the buyer of my export trade, So that UKEF can gain clarity on whether I have trading history with the buyer as part of due diligence',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitYourBuyerForms({ formToStopAt: 'tradedWithBuyer', exporterHasTradedWithBuyer: true });

        cy.clickYesRadioInput();
        cy.clickProvideAlternativeCurrencyLink();

        url = `${baseUrl}${ROOT}/${referenceNumber}${ALTERNATIVE_CURRENCY}`;

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
        backLink: `${ROOT}/${referenceNumber}${TRADING_HISTORY}`,
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
    });

    describe('currency form fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      const { rendering, formSubmission } = assertCurrencyFormFields({
        errors: ERRORS,
      });

      rendering();

      formSubmission().selectAltRadioButNoAltCurrency({});

      formSubmission().submitASupportedCurrency({ url: TRADING_HISTORY });
      formSubmission().submitAlternativeCurrency({ url: TRADING_HISTORY });
    });
  },
);

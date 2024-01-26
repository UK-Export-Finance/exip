import {
  headingCaption, field,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { BUTTONS, ERROR_MESSAGES, FIELDS, PAGES } from '../../../../../../content-strings';
import { YOUR_BUYER_FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import assertAlternativeCurrencyForm from '../../../../../../commands/insurance/assert-alternative-currency-form';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.ROOT;

const {
  ROOT,
  YOUR_BUYER: { ALTERNATIVE_CURRENCY },
} = INSURANCE_ROUTES;

const { CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE } } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: ERRORS,
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your Buyer - Alternative currency - As an exporter, I want to provide the details on trading history with the buyer of my export trade, So that UKEF can gain clarity on whether I have trading history with the buyer as part of due diligence', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${ALTERNATIVE_CURRENCY}`;

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
    const {
      radios, alternativeCurrencyInput, rendersAlternativeCurrencies, doesNotRenderSupportedCurrencies,
    } = assertAlternativeCurrencyForm({
      FIELD_ID: CURRENCY_CODE,
      LEGEND: YOUR_BUYER_FIELDS[CURRENCY_CODE].LEGEND,
      ALTERNATIVE_CURRENCY_TEXT: FIELDS[ALTERNATIVE_CURRENCY_CODE].TEXT,
    });

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
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render validation errors', () => {
        cy.clickSubmitButton();

        cy.checkText(
          partials.errorSummaryListItems().first(),
          ERRORS[CURRENCY_CODE].IS_EMPTY,
        );

        cy.checkText(
          field(CURRENCY_CODE).errorMessage(),
          `Error: ${ERRORS[CURRENCY_CODE].IS_EMPTY}`,
        );
      });
    });
  });
});

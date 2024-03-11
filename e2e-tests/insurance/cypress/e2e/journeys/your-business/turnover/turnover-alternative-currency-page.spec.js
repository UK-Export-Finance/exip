import { headingCaption } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { BUTTONS, ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { assertCurrencyFormFields } from '../../../../../../shared-test-assertions';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_ALTERNATIVE_CURRENCY;

const {
  ROOT,
  EXPORTER_BUSINESS: { TURNOVER_ROOT, TURNOVER_ALTERNATIVE_CURRENCY },
} = INSURANCE_ROUTES;

const {
  INSURANCE: {
    EXPORTER_BUSINESS: ERRORS,
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Turnover - Alternative currency page - As an Exporter I want to enter the turnover of my business so that UKEF can have clarity on my business financial position when processing my Export Insurance Application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();

      partials.provideAlternativeCurrencyLink().click();

      url = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER_ALTERNATIVE_CURRENCY}`;

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

    formSubmission().submitASupportedCurrency({ url: TURNOVER_ROOT });
    formSubmission().submitAlternativeCurrency({ url: TURNOVER_ROOT });
  });
});

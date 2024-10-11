import { headingCaption } from '../../../../../../pages/shared';
import { BUTTONS, ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { assertCurrencyFormFields } from '../../../../../../shared-test-assertions';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY;

const {
  ROOT,
  EXPORTER_BUSINESS: { TURNOVER_ROOT, TURNOVER_CURRENCY_ROOT, NATURE_OF_BUSINESS_ROOT },
} = INSURANCE_ROUTES;

const {
  INSURANCE: { EXPORTER_BUSINESS: ERRORS },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your business - Turnover - Currency page - As an Exporter I want to enter the turnover of my business so that UKEF can have clarity on my business financial position when processing my Export Insurance Application',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBusinessForms({ formToStopAt: 'natureOfYourBusiness' });

        url = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER_CURRENCY_ROOT}`;

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
        currentHref: `${ROOT}/${referenceNumber}${TURNOVER_CURRENCY_ROOT}`,
        backLink: `${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`,
        submitButtonCopy: BUTTONS.CONTINUE,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it('renders a `save and back` button', () => {
        cy.assertSaveAndBackButton();
      });
    });

    describe('currency form fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      const { rendering, formSubmission } = assertCurrencyFormFields({
        errors: ERRORS,
        expectedRedirectUrl: TURNOVER_ROOT,
      });

      rendering();

      formSubmission({}).executeTests();
    });
  },
);

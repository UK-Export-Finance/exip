import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../../support/quote/forms';
import partials from '../../../partials';
import { submitButton } from '../../../pages/shared';
import { tellUsAboutYourPolicyPage } from '../../../pages/quote';
import {
  FIELDS,
  LINKS,
  ORGANISATION,
  PAGES,
} from '../../../../../content-strings';
import { ROUTES, FIELD_IDS, SUPPORTED_CURRENCIES } from '../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY;

context('Tell us about your single policy page - as an exporter, I want to provide my Export insurance policy details', () => {
  const url = ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY;

  before(() => {
    cy.login();

    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();
    completeAndSubmitPolicyTypeSingleForm();

    cy.url().should('include', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.SINGLE_POLICY_PAGE_TITLE,
      currentHref: url,
      backLink: ROUTES.QUOTE.POLICY_TYPE,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('passes the audits', () => {
      cy.lighthouse({
        // accessibility threshold is reduced here because
        // the radio component from design system has an invalid aria attribute.
        // this is out of our control
        accessibility: 92,
        performance: 75,
        'best-practices': 100,
        seo: 60,
      });
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');
      partials.backLink().invoke('text').then((text) => {
        expect(text.trim()).equal(LINKS.BACK);
      });

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.POLICY_TYPE}`;

      partials.backLink().should('have.attr', 'href', expected);
    });

    it('renders an analytics cookies consent banner that can be accepted', () => {
      cy.checkAnalyticsCookiesConsentAndAccept();
    });

    it('renders an analytics cookies consent banner that can be rejected', () => {
      cy.rejectAnalyticsCookies();
    });

    it('renders a phase banner', () => {
      cy.checkPhaseBanner();
    });

    it('renders a page title and heading', () => {
      const expectedPageTitle = `${CONTENT_STRINGS.SINGLE_POLICY_PAGE_TITLE} - ${ORGANISATION}`;
      cy.title().should('eq', expectedPageTitle);

      tellUsAboutYourPolicyPage.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.SINGLE_POLICY_HEADING);
      });
    });

    it('renders `currency and amount` legend', () => {
      const fieldId = FIELD_IDS.AMOUNT_CURRENCY;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.legend().should('exist');
      cy.checkText(field.legend(), FIELDS[fieldId].SINGLE_POLICY.LEGEND);
    });

    it('renders `currency` legend, label and input', () => {
      const fieldId = FIELD_IDS.CURRENCY;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS[fieldId].LABEL);

      field.input().should('exist');
    });

    it('renders only supported currencies in alphabetical order', () => {
      const fieldId = FIELD_IDS.CURRENCY;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.input().select(1).should('have.value', SUPPORTED_CURRENCIES[0]);
      field.input().select(2).should('have.value', SUPPORTED_CURRENCIES[1]);
      field.input().select(3).should('have.value', SUPPORTED_CURRENCIES[2]);
    });

    it('renders `contract value` label and input', () => {
      const fieldId = FIELD_IDS.CONTRACT_VALUE;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS[fieldId].LABEL);

      field.input().should('exist');
    });

    it('renders `percentage of cover` label, no hint and input with correct options', () => {
      const fieldId = FIELD_IDS.PERCENTAGE_OF_COVER;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS[fieldId].SINGLE_POLICY.LABEL);

      cy.checkText(field.hint(), '');

      field.input().should('exist');

      field.inputOption().then((options) => {
        const actual = [...options].map((o) => o.value);

        const expected = ['', '70', '75', '80', '85', '90', '95'];
        expect(actual).to.deep.eq(expected);
      });
    });

    it('does NOT render `credit period` label, hint and input', () => {
      const fieldId = FIELD_IDS.CREDIT_PERIOD;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('not.exist');

      field.hint().should('not.exist');

      field.input().should('not.exist');
    });
  });

  describe('when form is valid', () => {
    it(`should redirect to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`, () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input(), '100');
      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].input().select(GBP_CURRENCY_CODE);
      tellUsAboutYourPolicyPage[FIELD_IDS.PERCENTAGE_OF_COVER].input().select('90');

      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });
  });
});

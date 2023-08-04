import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../../support/quote/forms';
import { submitButton } from '../../../pages/shared';
import { tellUsAboutYourPolicyPage } from '../../../pages/quote';
import { FIELDS, PAGES } from '../../../../../content-strings';
import { ROUTES, FIELD_IDS, SUPPORTED_CURRENCIES } from '../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY;

const {
  ELIGIBILITY: {
    CURRENCY,
    CONTRACT_VALUE,
    PERCENTAGE_OF_COVER,
    CREDIT_PERIOD,
    AMOUNT_CURRENCY,
  },
} = FIELD_IDS;

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
      isInsurancePage: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      Cypress.Cookies.preserveOnce('_csrf');
      Cypress.Cookies.preserveOnce('exip-session');
    });

    // TODO: re-enable after solution for lighthouse-GHA found
    // it('passes the audits', () => {
    //   cy.lighthouse({
    //     // accessibility threshold is reduced here because
    //     // the radio component from design system has an invalid aria attribute.
    //     // this is out of our control
    //     accessibility: 92,
    //     performance: 75,
    //     'best-practices': 100,
    //     seo: 60,
    //   });
    // });

    it('renders `currency and amount` legend', () => {
      const fieldId = AMOUNT_CURRENCY;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.legend().should('exist');
      cy.checkText(field.legend(), FIELDS[fieldId].SINGLE_POLICY.LEGEND);
    });

    it('renders `currency` legend, label and input', () => {
      const fieldId = CURRENCY;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS[fieldId].LABEL);

      field.input().should('exist');
    });

    it('renders only supported currencies in alphabetical order', () => {
      const fieldId = CURRENCY;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.input().select(1).should('have.value', SUPPORTED_CURRENCIES[0]);
      field.input().select(2).should('have.value', SUPPORTED_CURRENCIES[1]);
      field.input().select(3).should('have.value', SUPPORTED_CURRENCIES[2]);
    });

    it('renders `contract value` label and input', () => {
      const fieldId = CONTRACT_VALUE;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS[fieldId].LABEL);

      field.input().should('exist');
    });

    it('renders `percentage of cover` label, no hint and input with correct options', () => {
      const fieldId = PERCENTAGE_OF_COVER;

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
      const fieldId = CREDIT_PERIOD;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('not.exist');

      field.hint().should('not.exist');

      field.input().should('not.exist');
    });
  });

  describe('when form is valid', () => {
    it(`should redirect to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`, () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(tellUsAboutYourPolicyPage[CONTRACT_VALUE].input(), '100');
      tellUsAboutYourPolicyPage[CURRENCY].input().select(GBP_CURRENCY_CODE);
      tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('90');

      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });
  });
});

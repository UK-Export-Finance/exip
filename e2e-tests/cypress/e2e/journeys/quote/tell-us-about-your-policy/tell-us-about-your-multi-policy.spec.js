import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeMultiForm,
} from '../../../../support/quote/forms';
import { submitButton } from '../../../pages/shared';
import { tellUsAboutYourPolicyPage } from '../../../pages/quote';
import partials from '../../../partials';
import {
  LINKS,
  FIELDS,
  PAGES,
} from '../../../../../content-strings';
import { ROUTES, FIELD_IDS, SUPPORTED_CURRENCIES } from '../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY;

const startRoute = ROUTES.QUOTE.START;

context('Tell us about your multiple policy page - as an exporter, I want to provide my Export insurance policy details', () => {
  describe('rendering', () => {
    before(() => {
      cy.login();

      completeAndSubmitBuyerCountryForm();
      completeAndSubmitBuyerBodyForm();
      completeAndSubmitExporterLocationForm();
      completeAndSubmitUkContentForm();
      completeAndSubmitPolicyTypeMultiForm();

      cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
    });

    beforeEach(() => {
      Cypress.Cookies.preserveOnce('_csrf');
      Cypress.Cookies.preserveOnce('connect.sid');
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.MULTIPLE_POLICY_PAGE_TITLE,
        currentHref: ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
        expectedBackLink: ROUTES.QUOTE.POLICY_TYPE,
        assertSubmitButton: true,
        lightHouseThresholds: {
          // accessibility threshold is reduced here because
          // the radio component from design system has an invalid aria attribute.
          // this is out of our control
          accessibility: 92,
        },
      });
    });

    it('should render a header with href to quote start', () => {
      partials.header.serviceName().should('have.attr', 'href', startRoute);
    });

    it('renders `currency and amount` legend', () => {
      const fieldId = FIELD_IDS.AMOUNT_CURRENCY;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.legend().should('exist');
      cy.checkText(field.legend(), FIELDS[fieldId].MULTIPLE_POLICY.LEGEND);
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

    it('renders `max amount owed` label and input', () => {
      const fieldId = FIELD_IDS.MAX_AMOUNT_OWED;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS[fieldId].LABEL);

      field.input().should('exist');
    });

    it('renders `percentage of cover` label, hint and input', () => {
      const fieldId = FIELD_IDS.PERCENTAGE_OF_COVER;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS[fieldId].MULTIPLE_POLICY.LABEL);

      field.hint().should('exist');
      cy.checkText(field.hint(), FIELDS[fieldId].MULTIPLE_POLICY.HINT);

      field.input().should('exist');
    });

    it('renders `percentage of cover` label, hint and input with correct options', () => {
      const fieldId = FIELD_IDS.PERCENTAGE_OF_COVER;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS[fieldId].MULTIPLE_POLICY.LABEL);

      field.hint().should('exist');
      cy.checkText(field.hint(), FIELDS[fieldId].MULTIPLE_POLICY.HINT);

      field.input().should('exist');

      field.inputOption().then((options) => {
        const actual = [...options].map((o) => o.value);

        const expected = ['', '70', '75', '80', '85', '90', '95'];
        expect(actual).to.deep.eq(expected);
      });
    });

    it('renders `credit period` label, hint and input with correct options', () => {
      const fieldId = FIELD_IDS.CREDIT_PERIOD;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.labelText(), FIELDS[fieldId].LABEL);

      field.hint().should('exist');

      const { HINT } = FIELDS[fieldId];

      const expectedHintText = `${HINT[0].text} ${HINT[1].text} ${HINT[2].text}`;
      cy.checkText(field.hint(), expectedHintText);

      field.hintLink().should('have.attr', 'href', LINKS.EXTERNAL.NBI_FORM);

      field.input().should('exist');

      field.inputOption().then((options) => {
        const actual = [...options].map((o) => o.value);

        const expected = ['', '1', '2'];
        expect(actual).to.deep.eq(expected);
      });
    });
  });

  describe('when form is valid', () => {
    it(`should redirect to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`, () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].input().type('100');
      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].input().select(GBP_CURRENCY_CODE);
      tellUsAboutYourPolicyPage[FIELD_IDS.PERCENTAGE_OF_COVER].input().select('90');
      tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].input().select('1');

      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });
  });
});

import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../../../../commands/quote/forms';
import { field as fieldSelector, submitButton } from '../../../../../../pages/shared';
import { tellUsAboutYourPolicyPage } from '../../../../../../pages/quote';
import { FIELDS, PAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, SUPPORTED_CURRENCIES } from '../../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY;

const { EUR, GBP, USD } = SUPPORTED_CURRENCIES;

const {
  ELIGIBILITY: {
    CURRENCY,
    CONTRACT_VALUE,
    PERCENTAGE_OF_COVER,
    CREDIT_PERIOD,
    AMOUNT_CURRENCY,
  },
  POLICY_LENGTH,
} = FIELD_IDS;

const {
  QUOTE: {
    TELL_US_ABOUT_YOUR_POLICY,
    POLICY_TYPE,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Tell us about your single policy page - as an exporter, I want to provide my Credit insurance policy details', () => {
  const url = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY}`;

  before(() => {
    cy.login();

    completeAndSubmitBuyerCountryForm({});
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();
    completeAndSubmitPolicyTypeSingleForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('should render core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.SINGLE_POLICY_PAGE_TITLE,
      currentHref: TELL_US_ABOUT_YOUR_POLICY,
      backLink: POLICY_TYPE,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render policy length input with label and hint', () => {
      const fieldId = POLICY_LENGTH;
      const field = fieldSelector(fieldId);

      field.input().should('be.visible');

      cy.checkText(field.label(), FIELDS[fieldId].LABEL);

      cy.checkText(field.hint(), FIELDS[fieldId].HINT);
    });

    it('should render `currency and amount` legend', () => {
      const fieldId = AMOUNT_CURRENCY;

      const field = fieldSelector(fieldId);

      field.legend().should('exist');
      cy.checkText(field.legend(), FIELDS[fieldId].SINGLE_POLICY.LEGEND);
    });

    it('should render `currency` legend, label and input', () => {
      const fieldId = CURRENCY;

      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS[fieldId].LABEL);

      field.input().should('exist');
    });

    it('should render only supported currencies in alphabetical order', () => {
      const fieldId = CURRENCY;

      const field = fieldSelector(fieldId);

      field.input().select(1).should('have.value', EUR.isoCode);
      field.input().select(2).should('have.value', GBP.isoCode);
      field.input().select(3).should('have.value', USD.isoCode);
    });

    it('should render `contract value` label and input', () => {
      const fieldId = CONTRACT_VALUE;

      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS[fieldId].LABEL);

      field.input().should('exist');
    });

    it('should render `percentage of cover` label, no hint and input with correct options', () => {
      const fieldId = PERCENTAGE_OF_COVER;

      const field = fieldSelector(fieldId);

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
    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(POLICY_LENGTH).input(), 1);
      cy.keyboardInput(fieldSelector(CONTRACT_VALUE).input(), 100);
      fieldSelector(CURRENCY).input().select(GBP_CURRENCY_CODE);
      fieldSelector(PERCENTAGE_OF_COVER).input().select('90');

      submitButton().click();

      const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(expectedUrl);
    });
  });
});

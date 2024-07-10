import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeMultiForm,
} from '../../../../../../commands/quote/forms';
import { field as fieldSelector } from '../../../../../../pages/shared';
import { tellUsAboutYourPolicyPage } from '../../../../../../pages/quote';
import {
  LINKS,
  FIELDS,
  PAGES,
} from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import {
  EUR,
  GBP,
  JPY,
  USD,
} from '../../../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY;

const {
  ELIGIBILITY: {
    AMOUNT_CURRENCY,
    CURRENCY,
    MAX_AMOUNT_OWED,
    PERCENTAGE_OF_COVER,
    CREDIT_PERIOD,
  },
} = FIELD_IDS;

const {
  QUOTE: {
    TELL_US_ABOUT_YOUR_POLICY,
    POLICY_TYPE,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Tell us about your multiple policy page - as an exporter, I want to provide my Credit insurance policy details', () => {
  const url = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY}`;

  before(() => {
    cy.login();

    completeAndSubmitBuyerCountryForm({});
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();
    completeAndSubmitPolicyTypeMultiForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('should render core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.MULTIPLE_POLICY_PAGE_TITLE,
      currentHref: TELL_US_ABOUT_YOUR_POLICY,
      backLink: POLICY_TYPE,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      lightHouseThresholds: {
        // accessibility threshold is reduced here because
        // the radio component from design system has an invalid aria attribute.
        // this is out of our control
        accessibility: 92,
      },
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render `currency and amount` legend', () => {
      const fieldId = AMOUNT_CURRENCY;

      const field = fieldSelector(fieldId);

      field.legend().should('exist');
      cy.checkText(field.legend(), FIELDS[fieldId].MULTIPLE_POLICY.LEGEND);
    });

    it('should render `currency` legend, label and input', () => {
      const fieldId = CURRENCY;

      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS[fieldId].LABEL);

      field.input().should('exist');
    });

    it('should render only supported currencies in a specific order', () => {
      const fieldId = CURRENCY;

      const field = fieldSelector(fieldId);

      field.input().select(1).should('have.value', GBP.isoCode);
      field.input().select(2).should('have.value', EUR.isoCode);
      field.input().select(3).should('have.value', USD.isoCode);
      field.input().select(4).should('have.value', JPY.isoCode);
    });

    it('should render `max amount owed` label and input', () => {
      const fieldId = MAX_AMOUNT_OWED;

      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS[fieldId].LABEL);

      field.input().should('exist');
    });

    it('should render `percentage of cover` label, hint and input', () => {
      const fieldId = PERCENTAGE_OF_COVER;

      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS[fieldId].MULTIPLE_POLICY.LABEL);

      cy.checkText(field.hint(), FIELDS[fieldId].MULTIPLE_POLICY.HINT);

      field.input().should('exist');
    });

    it('should render `percentage of cover` label, hint and input with correct options', () => {
      const fieldId = PERCENTAGE_OF_COVER;

      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS[fieldId].MULTIPLE_POLICY.LABEL);

      cy.checkText(field.hint(), FIELDS[fieldId].MULTIPLE_POLICY.HINT);

      field.input().should('exist');

      field.inputOption().then((options) => {
        const actual = [...options].map((o) => o.value);

        const expected = ['', '70', '75', '80', '85', '90', '95'];
        expect(actual).to.deep.eq(expected);
      });
    });

    it('should render `credit period` label, hint and input with correct options', () => {
      const fieldId = CREDIT_PERIOD;

      const field = tellUsAboutYourPolicyPage[fieldId];

      cy.checkText(field.label(), FIELDS[fieldId].LABEL);

      const { HINT } = FIELDS[fieldId];

      const expectedHintText = `${HINT[0].text} ${HINT[1].text} ${HINT[2].text}`;
      cy.checkText(field.hint(), expectedHintText);

      const expectedHintLinkHref = LINKS.EXTERNAL.NBI_FORM;
      const expectedHintLinkText = HINT[1].text;

      cy.checkLink(
        field.hintLink(),
        expectedHintLinkHref,
        expectedHintLinkText,
      );

      field.input().should('exist');

      field.inputOption().then((options) => {
        const actual = [...options].map((o) => o.value);

        const expected = ['', '1', '2'];
        expect(actual).to.deep.eq(expected);
      });
    });
  });

  describe('when form is valid', () => {
    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(MAX_AMOUNT_OWED).input(), '100');
      fieldSelector(CURRENCY).input().select(GBP.isoCode);
      fieldSelector(PERCENTAGE_OF_COVER).input().select('90');
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('1');

      cy.clickSubmitButton();

      const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(expectedUrl);
    });
  });
});

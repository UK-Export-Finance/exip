import {
  completeAndSubmitBuyerForm,
  completeAndSubmitCompanyForm,
  completeAndSubmitTriedToObtainCoverForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../support/forms';
import { tellUsAboutYourPolicyPage } from '../../pages';
import partials from '../../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  FIELDS,
  PAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const CONTENT_STRINGS = PAGES.TELL_US_ABOUT_YOUR_POLICY_PAGE;
const {
  ROUTES,
  FIELD_IDS,
  SUPPORTED_CURRENCIES,
} = CONSTANTS;
context('Tell us about the single policy you need', () => {
  describe('rendering', () => {
    before(() => {
      cy.login();

      completeAndSubmitBuyerForm();
      completeAndSubmitCompanyForm();
      completeAndSubmitTriedToObtainCoverForm();
      completeAndSubmitUkContentForm();
      completeAndSubmitPolicyTypeSingleForm();

      cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_POLICY);
    });

    beforeEach(() => {
      Cypress.Cookies.preserveOnce('_csrf');
      Cypress.Cookies.preserveOnce('connect.sid');
    });

    it('passes the audits', () => {
      cy.lighthouse({
        // accessibility threshold is reduced here because
        // the radio component from design system has an invalid aria attribute.
        // this is out of our control
        accessibility: 92,
        performance: 80,
        'best-practices': 100,
        seo: 60,
      });
    });

    it('renders a phase banner', () => {
      cy.checkPhaseBanner();
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');
      partials.backLink().invoke('text').then((text) => {
        expect(text.trim()).equal(LINKS.BACK);
      });

      const expected = `${Cypress.config('baseUrl')}${ROUTES.POLICY_TYPE}`;

      partials.backLink().should('have.attr', 'href', expected);
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
      field.legend().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].SINGLE_POLICY.LEGEND);
      });
    });

    it('renders `currency` legend, label and input', () => {
      const fieldId = FIELD_IDS.CURRENCY;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      field.label().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].LABEL);
      });

      field.input().should('exist');
    });

    it('renders only supported currencies in alphabetical order', () => {
      const fieldId = FIELD_IDS.CURRENCY;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.input().select(1).should('have.value', SUPPORTED_CURRENCIES[0]);
      field.input().select(2).should('have.value', SUPPORTED_CURRENCIES[1]);
      field.input().select(3).should('have.value', SUPPORTED_CURRENCIES[2]);
    });

    it('renders `amount` label and input', () => {
      const fieldId = FIELD_IDS.AMOUNT;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      field.label().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].SINGLE_POLICY.LABEL);
      });

      field.input().should('exist');
    });

    it('renders `percentage of cover` label, no hint and input with correct options', () => {
      const fieldId = FIELD_IDS.PERCENTAGE_OF_COVER;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      field.label().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].SINGLE_POLICY.LABEL);
      });

      field.hint().invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });

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

    it('renders a submit button', () => {
      const button = tellUsAboutYourPolicyPage.submitButton();
      button.should('exist');

      button.invoke('text').then((text) => {
        expect(text.trim()).equal(BUTTONS.CONTINUE);
      });
    });
  });

  describe('when form is valid', () => {
    it(`should redirect to ${ROUTES.CHECK_YOUR_ANSWERS}`, () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.AMOUNT].input().type('100');
      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].input().select('GBP');
      tellUsAboutYourPolicyPage[FIELD_IDS.PERCENTAGE_OF_COVER].input().select('90');

      tellUsAboutYourPolicyPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });
  });
});

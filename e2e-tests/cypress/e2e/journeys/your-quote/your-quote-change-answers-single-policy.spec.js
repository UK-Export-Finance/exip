import {
  buyerCountryPage,
  policyTypePage,
  tellUsAboutYourPolicyPage,
  checkYourAnswersPage,
  yourQuotePage,
} from '../../pages';
import partials from '../../partials';
import CONSTANTS from '../../../../constants';

const {
  ROUTES,
  FIELD_IDS,
} = CONSTANTS;

const {
  QUOTE,
  AMOUNT,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
} = FIELD_IDS;

context('Your quote page - change answers (single policy type to multi policy type)', () => {
  before(() => {
    cy.login();

    cy.submitAnswersHappyPathSinglePolicy();
    checkYourAnswersPage.submitButton().click();

    cy.url().should('include', ROUTES.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('change `insured for`', () => {
    it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      const row = yourQuotePage.panel.summaryList[QUOTE.INSURED_FOR];

      row.changeLink().click();

      const expectedUrl = `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${AMOUNT}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('auto focuses the input', () => {
      tellUsAboutYourPolicyPage[AMOUNT].input().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourPolicyPage[AMOUNT].input().clear().type('200');
      tellUsAboutYourPolicyPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      checkYourAnswersPage.submitButton().click();

      const row = yourQuotePage.panel.summaryList[QUOTE.INSURED_FOR];

      row.value().invoke('text').then((text) => {
        const expected = '£200.00';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe.only('change `policy length` and policy type to multi', () => {
    it(`clicking 'change' redirects to ${ROUTES.POLICY_TYPE_CHANGE}`, () => {
      const row = yourQuotePage.panel.summaryList[SINGLE_POLICY_LENGTH];

      row.changeLink().click();

      const expectedUrl = `${ROUTES.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('auto focuses the input', () => {
      policyTypePage[SINGLE_POLICY_LENGTH].input().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      policyTypePage[POLICY_TYPE].multi.input().click();
      policyTypePage[MULTI_POLICY_LENGTH].input().type('1');
      policyTypePage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      checkYourAnswersPage.submitButton().click();
      cy.url().should('include', ROUTES.YOUR_QUOTE);

      const row = yourQuotePage.panel.summaryList[MULTI_POLICY_LENGTH];

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal('1 months');
      });
    });
  });

  describe('change `buyer location`', () => {
    it(`clicking 'change' redirects to ${ROUTES.BUYER_COUNTRY_CHANGE}`, () => {
      const row = yourQuotePage.panel.summaryList[QUOTE.BUYER_LOCATION];

      row.changeLink().click();

      const expectedUrl = `${ROUTES.BUYER_COUNTRY_CHANGE}#${QUOTE.BUYER_LOCATION}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('auto focuses the input', () => {
      // autocomplete component does not have a focused attribute, instead it has a class.
      // this is added with client side JS.
      // we have to wait to ensure that client side js has been executed.
      cy.wait(8000); // eslint-disable-line cypress/no-unnecessary-waiting

      buyerCountryPage.searchInput().should('have.class', 'autocomplete__input--focused');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      buyerCountryPage.searchInput().type('Bahrain');
      const results = buyerCountryPage.results();
      results.first().click();
      buyerCountryPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      checkYourAnswersPage.submitButton().click();

      const row = yourQuotePage.panel.summaryList[QUOTE.BUYER_LOCATION];

      row.value().invoke('text').then((text) => {
        const expected = 'Bahrain';

        expect(text.trim()).equal(expected);
      });
    });
  });
});

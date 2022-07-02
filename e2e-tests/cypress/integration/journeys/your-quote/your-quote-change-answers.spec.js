import {
  buyerBasedPage,
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

context('Your quote page - change answers', () => {
  before(() => {
    cy.login();

    cy.submitAnswersHappyPath();
    tellUsAboutYourPolicyPage.submitButton().click();

    cy.url().should('include', ROUTES.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('change `insured for`', () => {
    let row = yourQuotePage.panel.summaryList[QUOTE.INSURED_FOR];

    it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
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

      row = yourQuotePage.panel.summaryList[QUOTE.INSURED_FOR];

      row.value().invoke('text').then((text) => {
        const expected = '£200.00';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change `policy length`', () => {
    let row = yourQuotePage.panel.summaryList[SINGLE_POLICY_LENGTH];

    it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${SINGLE_POLICY_LENGTH}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('auto focuses the input', () => {
      tellUsAboutYourPolicyPage[SINGLE_POLICY_LENGTH].input().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourPolicyPage[POLICY_TYPE].multi.input().click();
      tellUsAboutYourPolicyPage[MULTI_POLICY_LENGTH].input().type('10');
      tellUsAboutYourPolicyPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      checkYourAnswersPage.submitButton().click();

      row = yourQuotePage.panel.summaryList[MULTI_POLICY_LENGTH];

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal('10 months');
      });
    });
  });

  describe('change `buyer location`', () => {
    let row = yourQuotePage.panel.summaryList[QUOTE.BUYER_LOCATION];

    it(`clicking 'change' redirects to ${ROUTES.BUYER_BASED_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.BUYER_BASED_CHANGE}#${QUOTE.BUYER_LOCATION}`;
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
      cy.wait(3000); // eslint-disable-line cypress/no-unnecessary-waiting

      buyerBasedPage.searchInput().should('have.class', 'autocomplete__input--focused');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      buyerBasedPage.searchInput().type('Belg');
      const results = buyerBasedPage.results();
      results.first().click();
      buyerBasedPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      checkYourAnswersPage.submitButton().click();

      row = yourQuotePage.panel.summaryList[QUOTE.BUYER_LOCATION];

      row.value().invoke('text').then((text) => {
        const expected = 'Belgium';

        expect(text.trim()).equal(expected);
      });
    });
  });
});

import { backLink, buyerCountryPage, submitButton } from '../../../pages/shared';
import { tellUsAboutYourPolicyPage, yourQuotePage } from '../../../pages/quote';
import { FIELD_IDS, ROUTES } from '../../../../../constants';

const {
  ELIGIBILITY: {
    MAX_AMOUNT_OWED,
    PERCENTAGE_OF_COVER,
  },
  QUOTE,
} = FIELD_IDS;

context('Your quote page - change answers (policy type and length from multiple to single) - as an exporter, I want to get an Export insurance quote', () => {
  const url = ROUTES.QUOTE.YOUR_QUOTE;

  before(() => {
    cy.login();

    cy.submitQuoteAnswersHappyPathMultiplePolicy();
    submitButton().click();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('change `max amount owed`', () => {
    const row = yourQuotePage.panel.summaryList[MAX_AMOUNT_OWED];

    beforeEach(() => {
      cy.navigateToUrl(url);

      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      const expectedUrl = ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE;
      cy.assertUrl(expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`;
      cy.assertUrl(expected);
    });

    it('renders a back link with correct url', () => {
      backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${url}`;
      backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      cy.keyboardInput(tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input(), '200');

      submitButton().click();

      cy.assertUrl(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      // form submit
      submitButton().click();

      // submit check your answers
      submitButton().click();

      const expected = '£200';
      cy.checkText(row.value(), expected);
    });
  });

  describe('change `percentage of cover`', () => {
    const row = yourQuotePage.panel.summaryList[PERCENTAGE_OF_COVER];

    beforeEach(() => {
      cy.navigateToUrl(url);

      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      const expectedUrl = ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE;
      cy.assertUrl(expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;
      cy.assertUrl(expected);
    });

    it('renders a back link with correct url', () => {
      backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${url}`;
      backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('95');
      submitButton().click();

      cy.assertUrl(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      // form submit
      submitButton().click();

      // submit check your answers
      submitButton().click();

      const expected = '95%';
      cy.checkText(row.value(), expected);
    });
  });

  describe('change `buyer location`', () => {
    const row = yourQuotePage.panel.summaryList[QUOTE.BUYER_LOCATION];

    beforeEach(() => {
      cy.navigateToUrl(url);

      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}`, () => {
      const expectedUrl = ROUTES.QUOTE.BUYER_COUNTRY_CHANGE;
      cy.assertUrl(expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`;
      cy.assertUrl(expected);
    });

    it('renders a back link with correct url', () => {
      backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${url}`;
      backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      cy.keyboardInput(buyerCountryPage.input(), 'Brazil');
      const results = buyerCountryPage.results();
      results.first().click();

      submitButton().click();

      cy.assertUrl(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answers in the quote', () => {
      cy.keyboardInput(buyerCountryPage.input(), 'Brazil');
      const results = buyerCountryPage.results();
      results.first().click();

      // form submit
      submitButton().click();

      // submit check your answers
      submitButton().click();

      cy.assertUrl(url);

      const buyerLocation = yourQuotePage.panel.summaryList[QUOTE.BUYER_LOCATION];

      cy.checkText(buyerLocation.value(), 'Brazil');
    });
  });
});

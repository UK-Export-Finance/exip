import { backLink, buyerCountryPage, submitButton } from '../../../pages/shared';
import {
  policyTypePage,
  tellUsAboutYourPolicyPage,
  yourQuotePage,
} from '../../../pages/quote';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../constants';

const {
  ELIGIBILITY: {
    CONTRACT_VALUE,
    CREDIT_PERIOD,
    MAX_AMOUNT_OWED,
    PERCENTAGE_OF_COVER,
  },
  MULTIPLE_POLICY_LENGTH,
  POLICY_TYPE,
  QUOTE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

context('Your quote page - change answers (single policy type to multiple policy type) - as an exporter, I want to get an Export insurance quote', () => {
  const url = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.YOUR_QUOTE}`;

  beforeEach(() => {
    cy.saveSession();

    cy.login();

    cy.submitQuoteAnswersHappyPathSinglePolicy();
    submitButton().click();

    cy.assertUrl(url);
  });

  describe('change `contract value`', () => {
    const row = yourQuotePage.panel.summaryList[CONTRACT_VALUE];

    beforeEach(() => {
      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      const expected = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`;
      cy.assertUrl(expected);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`;
      cy.assertUrl(expected);
    });

    it('renders a back link with correct url', () => {
      backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.YOUR_QUOTE}`;
      backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      cy.keyboardInput(tellUsAboutYourPolicyPage[CONTRACT_VALUE].input(), '1000');
      submitButton().click();

      cy.assertUrl(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      cy.keyboardInput(tellUsAboutYourPolicyPage[CONTRACT_VALUE].input(), '1000');

      // form submit
      submitButton().click();

      // submit check your answers
      submitButton().click();

      const expected = '£1,000';
      cy.checkText(row.value(), expected);
    });
  });

  describe('change `percentage of cover`', () => {
    const row = yourQuotePage.panel.summaryList[PERCENTAGE_OF_COVER];

    beforeEach(() => {
      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      const expectedUrl = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}`;
      cy.assertUrl(expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;
      cy.assertUrl(expected);
    });

    it('renders a back link with correct url', () => {
      backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.YOUR_QUOTE}`;
      backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('85');
      submitButton().click();

      cy.assertUrl(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('85');

      // form submit
      submitButton().click();

      // submit check your answers
      submitButton().click();

      const expected = '85%';
      cy.checkText(row.value(), expected);
    });
  });

  describe('change policy type to multi', () => {
    const row = yourQuotePage.panel.summaryList[SINGLE_POLICY_LENGTH];

    beforeEach(() => {
      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${ROUTES.QUOTE.POLICY_TYPE_CHANGE}`, () => {
      const expectedUrl = ROUTES.QUOTE.POLICY_TYPE_CHANGE;
      cy.assertUrl(expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`;
      cy.assertUrl(expected);
    });

    it('renders a back link with correct url', () => {
      backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.YOUR_QUOTE}`;
      backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY} when submitting a new answer`, () => {
      policyTypePage[POLICY_TYPE].multiple.input().click();
      submitButton().click();

      cy.assertUrl(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
    });

    it('renders the new answers in the quote', () => {
      policyTypePage[POLICY_TYPE].multiple.input().click();
      submitButton().click();

      // max amount owed and credit period fields are now required because it's a multiple policy
      cy.keyboardInput(tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input(), '120000');
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('1');

      // form submit
      submitButton().click();

      // submit check your answers
      submitButton().click();

      cy.assertUrl(ROUTES.QUOTE.YOUR_QUOTE);

      const insuredFor = yourQuotePage.panel.summaryList[QUOTE.INSURED_FOR];

      cy.checkText(insuredFor.value(), '£108,000.00');

      const policyLength = yourQuotePage.panel.summaryList[MULTIPLE_POLICY_LENGTH];

      cy.checkText(policyLength.value(), `${FIELD_VALUES.POLICY_LENGTH.MULTIPLE} months`);
    });
  });

  describe('change `buyer location`', () => {
    const row = yourQuotePage.panel.summaryList[QUOTE.BUYER_LOCATION];

    beforeEach(() => {
      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}`, () => {
      const expectedUrl = ROUTES.QUOTE.BUYER_COUNTRY_CHANGE;
      cy.assertUrl(expectedUrl);
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`;
      cy.assertUrl(expected);
    });

    it('renders a back link with correct url', () => {
      backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.YOUR_QUOTE}`;
      backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      cy.keyboardInput(buyerCountryPage.input(), 'Bahrain');
      const results = buyerCountryPage.results();
      results.first().click();

      submitButton().click();

      cy.assertUrl(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      cy.keyboardInput(buyerCountryPage.input(), 'Bahrain');
      const results = buyerCountryPage.results();
      results.first().click();

      // form submit
      submitButton().click();

      // submit check your answers
      submitButton().click();

      const expected = 'Bahrain';
      cy.checkText(row.value(), expected);
    });
  });
});

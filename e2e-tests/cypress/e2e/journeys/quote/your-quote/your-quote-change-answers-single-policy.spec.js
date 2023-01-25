import { buyerCountryPage, submitButton } from '../../../pages/shared';
import {
  policyTypePage,
  tellUsAboutYourPolicyPage,
  yourQuotePage,
} from '../../../pages/quote';
import partials from '../../../partials';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../constants';

const {
  CONTRACT_VALUE,
  CREDIT_PERIOD,
  MAX_AMOUNT_OWED,
  MULTIPLE_POLICY_LENGTH,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  QUOTE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

context('Your quote page - change answers (single policy type to multiplepolicy type) - as an exporter, I want to get an Export insurance quote', () => {
  before(() => {
    cy.login();

    cy.submitAnswersHappyPathSinglePolicy();
    submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('change `contract value`', () => {
    it(`clicking 'change' redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      const row = yourQuotePage.panel.summaryList[CONTRACT_VALUE];

      row.changeLink().click();

      const expectedUrl = ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourPolicyPage[CONTRACT_VALUE].input().clear().type('1000');
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      submitButton().click();

      const row = yourQuotePage.panel.summaryList[CONTRACT_VALUE];

      row.value().invoke('text').then((text) => {
        const expected = '£1,000';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change `percentage of cover`', () => {
    it(`clicking 'change' redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      const row = yourQuotePage.panel.summaryList[PERCENTAGE_OF_COVER];

      row.changeLink().click();

      const expectedUrl = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}`;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('85');
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      submitButton().click();

      const row = yourQuotePage.panel.summaryList[PERCENTAGE_OF_COVER];

      row.value().invoke('text').then((text) => {
        const expected = '85%';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change policy type to multi', () => {
    it(`clicking 'change' redirects to ${ROUTES.QUOTE.POLICY_TYPE_CHANGE}`, () => {
      const row = yourQuotePage.panel.summaryList[SINGLE_POLICY_LENGTH];

      row.changeLink().click();

      const expectedUrl = ROUTES.QUOTE.POLICY_TYPE_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY} when submitting a new answer`, () => {
      policyTypePage[POLICY_TYPE].multi.input().click();
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
    });

    it('renders the new answers in the quote', () => {
      // max amount owed and credit period fields are now required because it's a multiplepolicy
      tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input().type('120000');
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('1');
      submitButton().click();

      submitButton().click();
      cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);

      const insuredFor = yourQuotePage.panel.summaryList[QUOTE.INSURED_FOR];

      insuredFor.value().invoke('text').then((text) => {
        expect(text.trim()).equal('£102,000.00');
      });

      const policyLength = yourQuotePage.panel.summaryList[MULTIPLE_POLICY_LENGTH];

      policyLength.value().invoke('text').then((text) => {
        expect(text.trim()).equal(`${FIELD_VALUES.POLICY_LENGTH.MULTI} months`);
      });
    });
  });

  describe('change `buyer location`', () => {
    it(`clicking 'change' redirects to ${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}`, () => {
      const row = yourQuotePage.panel.summaryList[QUOTE.BUYER_LOCATION];

      row.changeLink().click();

      const expectedUrl = ROUTES.QUOTE.BUYER_COUNTRY_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      buyerCountryPage.searchInput().type('Bahrain');
      const results = buyerCountryPage.results();
      results.first().click();
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      submitButton().click();

      const row = yourQuotePage.panel.summaryList[QUOTE.BUYER_LOCATION];

      row.value().invoke('text').then((text) => {
        const expected = 'Bahrain';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change `buyer location`', () => {
    it(`clicking 'change' redirects to ${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}`, () => {
      const row = yourQuotePage.panel.summaryList[QUOTE.BUYER_LOCATION];

      row.changeLink().click();

      const expectedUrl = ROUTES.QUOTE.BUYER_COUNTRY_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      buyerCountryPage.searchInput().type('Brazil');
      const results = buyerCountryPage.results();
      results.first().click();
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answers in the quote', () => {
      submitButton().click();
      cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);

      const buyerLocation = yourQuotePage.panel.summaryList[QUOTE.BUYER_LOCATION];

      buyerLocation.value().invoke('text').then((text) => {
        expect(text.trim()).equal('Brazil');
      });
    });
  });
});

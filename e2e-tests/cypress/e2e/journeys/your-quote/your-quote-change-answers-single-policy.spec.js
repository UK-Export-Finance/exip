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
  CONTRACT_VALUE,
  CREDIT_PERIOD,
  MAX_AMOUNT_OWED,
  MULTI_POLICY_LENGTH,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  QUOTE,
  SINGLE_POLICY_LENGTH,
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

      const expectedUrl = ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourPolicyPage[CONTRACT_VALUE].input().clear().type('200');
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

  describe('change `percentage of cover`', () => {
    it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      const row = yourQuotePage.panel.summaryList[PERCENTAGE_OF_COVER];

      row.changeLink().click();

      const expectedUrl = `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}`;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('85');
      tellUsAboutYourPolicyPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in the quote', () => {
      checkYourAnswersPage.submitButton().click();

      const row = yourQuotePage.panel.summaryList[PERCENTAGE_OF_COVER];

      row.value().invoke('text').then((text) => {
        const expected = '85%';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change `policy length` and policy type to multi', () => {
    it(`clicking 'change' redirects to ${ROUTES.POLICY_TYPE_CHANGE}`, () => {
      const row = yourQuotePage.panel.summaryList[SINGLE_POLICY_LENGTH];

      row.changeLink().click();

      const expectedUrl = ROUTES.POLICY_TYPE_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it(`redirects to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY} when submitting a new answer`, () => {
      policyTypePage[POLICY_TYPE].multi.input().click();
      policyTypePage[MULTI_POLICY_LENGTH].input().type('1');
      policyTypePage.submitButton().click();

      cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_POLICY);
    });

    it('renders the new answers in the quote', () => {
      // max amount owed and credit period fields are now required because it's a multi policy
      tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input().type('120000');
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().type('1');
      tellUsAboutYourPolicyPage.submitButton().click();

      checkYourAnswersPage.submitButton().click();
      cy.url().should('include', ROUTES.YOUR_QUOTE);

      const insuredFor = yourQuotePage.panel.summaryList[QUOTE.INSURED_FOR];

      insuredFor.value().invoke('text').then((text) => {
        expect(text.trim()).equal('£120,000.00');
      });

      const policyLength = yourQuotePage.panel.summaryList[MULTI_POLICY_LENGTH];

      policyLength.value().invoke('text').then((text) => {
        expect(text.trim()).equal('1 months');
      });
    });
  });

  describe('change `buyer location`', () => {
    it(`clicking 'change' redirects to ${ROUTES.BUYER_COUNTRY_CHANGE}`, () => {
      const row = yourQuotePage.panel.summaryList[QUOTE.BUYER_LOCATION];

      row.changeLink().click();

      const expectedUrl = ROUTES.BUYER_COUNTRY_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.BUYER_COUNTRY_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.YOUR_QUOTE}`;
      partials.backLink().should('have.attr', 'href', expected);
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

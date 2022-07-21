import { guidancePage } from '../pages';
import { ROUTES } from '../../../constants';

context('Guidance page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.GUIDANCE, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 80,
      'best-practices': 100,
      seo: 65,
    });
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  describe('what it costs section - get a quote link', () => {
    it('clicking the link redirects to the `Before you start` page', () => {
      guidancePage.whatItCosts.getAQuote().click();

      cy.url().should('include', ROUTES.BEFORE_YOU_START);
    });
  });

  describe('eligibility section - get a quote link', () => {
    it('clicking the link redirects to the `Before you start` page', () => {
      guidancePage.eligibility.getAQuote().click();

      cy.url().should('include', ROUTES.BEFORE_YOU_START);
    });
  });

  describe('buyer countries section - get a quote link', () => {
    it('clicking the link redirects to the `Before you start` page', () => {
      guidancePage.buyerCountries.getAQuote().click();

      cy.url().should('include', ROUTES.BEFORE_YOU_START);
    });
  });
});

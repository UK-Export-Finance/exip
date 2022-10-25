import partials from '../../partials';
import { submitButton } from '../../pages/shared';
import { cookiesPage } from '../../pages';
import { FIELD_IDS, ROUTES } from '../../../../constants';

context('Cookies consent - change via banner and cookies page', () => {
  beforeEach(() => {
    cy.login();
  });

  context('User submits cookie consent in the banner as `accept` and navigates to the cookies page', () => {
    beforeEach(() => {
      partials.cookieBanner.question.acceptButton().click();
      partials.cookieBanner.hideButton().click();

      partials.footer.supportLinks.cookies().click();
      cy.url().should('include', ROUTES.COOKIES);

      cy.checkAnalyticsScriptsAreRendered();
      cy.checkAnalyticsCookieIsTrue();
    });

    it('should NOT render the cookie consent banner', () => {
      cy.checkCookiesConsentBannerDoesNotExist();
    });

    it('should render a google tag manager script and data layer script', () => {
      cy.checkAnalyticsScriptsAreRendered();
    });

    it('should have an EXIP analytics consent cookie with a value of true', () => {
      cy.checkAnalyticsCookieIsTrue();
    });

    it('should allow user to immediately change their answer to `reject` and have scripts & cookies changed via the cookies page', () => {
      cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].rejectInput().click();
      submitButton().click();

      cy.checkAnalyticsScriptsAreNotRendered();
      cy.checkAnalyticsCookieIsFalse();
    });

    it('should NOT render the cookie consent banner when going to another page', () => {
      cy.visit(ROUTES.QUOTE.BUYER_COUNTRY, {
        auth: {
          username: Cypress.config('basicAuthKey'),
          password: Cypress.config('basicAuthSecret'),
        },
      });

      partials.cookieBanner.heading().should('not.be.visible');
      partials.cookieBanner.hideButton().should('not.exist');
      partials.cookieBanner.cookiesLink().should('not.be.visible');

      partials.cookieBanner.question.copy1().should('not.be.visible');
      partials.cookieBanner.question.copy2().should('not.be.visible');
      partials.cookieBanner.question.acceptButton().should('not.be.visible');
      partials.cookieBanner.question.rejectButton().should('not.be.visible');
    });
  });

  context('User submits cookie consent in the banner as `reject` and navigates to the cookies page', () => {
    beforeEach(() => {
      partials.cookieBanner.question.rejectButton().click();
      partials.cookieBanner.hideButton().click();

      partials.footer.supportLinks.cookies().click();
      cy.url().should('include', ROUTES.COOKIES);

      cy.checkAnalyticsScriptsAreNotRendered();
      cy.checkAnalyticsCookieIsFalse();
    });

    it('should NOT render the cookie consent banner', () => {
      cy.checkCookiesConsentBannerDoesNotExist();
    });

    it('should NOT render a google tag manager script and data layer script', () => {
      cy.checkAnalyticsScriptsAreNotRendered();
    });

    it('should have an EXIP analytics consent cookie with a value of false', () => {
      cy.checkAnalyticsCookieIsFalse();
    });

    it('should allow user to immediately change their answer to `approve` and have scripts & cookies changed via the cookies page', () => {
      cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptInput().click();
      submitButton().click();

      cy.checkAnalyticsScriptsAreRendered();
      cy.checkAnalyticsCookieIsTrue();
    });

    it('should NOT render the cookie consent banner when going to another page', () => {
      cy.visit(ROUTES.QUOTE.BUYER_COUNTRY, {
        auth: {
          username: Cypress.config('basicAuthKey'),
          password: Cypress.config('basicAuthSecret'),
        },
      });

      partials.cookieBanner.heading().should('not.be.visible');
      partials.cookieBanner.hideButton().should('not.exist');
      partials.cookieBanner.cookiesLink().should('not.be.visible');

      partials.cookieBanner.question.copy1().should('not.be.visible');
      partials.cookieBanner.question.copy2().should('not.be.visible');
      partials.cookieBanner.question.acceptButton().should('not.be.visible');
      partials.cookieBanner.question.rejectButton().should('not.be.visible');
    });
  });
});

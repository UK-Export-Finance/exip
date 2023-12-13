import partials from '../../../../../../partials';
import { COOKIES_CONSENT } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';

const baseUrl = Cypress.config('baseUrl');

context('Cookies consent - accept', () => {
  const url = `${baseUrl}${ROUTES.QUOTE.BUYER_COUNTRY}`;

  beforeEach(() => {
    cy.login();

    cy.assertUrl(url);
  });

  describe('when clicking `accept cookies` button', () => {
    beforeEach(() => {
      cy.clearCookies();

      cy.navigateToUrl(url);

      partials.cookieBanner.question.acceptButton().click();
    });

    it('should remain on the same page', () => {
      const expectedUrl = `${baseUrl}${ROUTES.QUOTE.BUYER_COUNTRY}`;

      cy.assertUrl(expectedUrl);
    });

    it('should not render the question banner', () => {
      partials.cookieBanner.question.copy1().should('not.exist');
      partials.cookieBanner.question.copy2().should('not.exist');
      partials.cookieBanner.question.acceptButton().should('not.exist');
      partials.cookieBanner.question.rejectButton().should('not.exist');
    });

    it('should render `accepted` banner', () => {
      partials.cookieBanner.heading().should('exist');

      partials.cookieBanner.accepted.copy().should('exist');

      const { ACCEPTED } = COOKIES_CONSENT;
      const expected = `${ACCEPTED.COPY_1} ${COOKIES_CONSENT.COOKIES_LINK} ${ACCEPTED.COPY_2}`;

      cy.checkText(partials.cookieBanner.accepted.copy(), expected);

      cy.checkLink(
        partials.cookieBanner.cookiesLink(),
        ROUTES.COOKIES,
        COOKIES_CONSENT.COOKIES_LINK,
      );

      partials.cookieBanner.hideButton().should('exist');
      cy.checkText(partials.cookieBanner.hideButton(), COOKIES_CONSENT.HIDE_BUTTON);
    });

    it('should render a google analytics and google tag manager scripts', () => {
      cy.checkAnalyticsScriptsAreRendered();
    });

    it('should add an EXIP analytics consent cookie with a value of true', () => {
      cy.checkAnalyticsCookieIsTrue();
    });
  });

  describe('when clicking `hide this message` button', () => {
    beforeEach(() => {
      cy.clearCookies();

      cy.navigateToUrl(url);

      partials.cookieBanner.question.acceptButton().click();
      partials.cookieBanner.hideButton().click();
    });

    it('should hide all banner elements', () => {
      partials.cookieBanner.heading().should('not.be.visible');
      partials.cookieBanner.hideButton().should('not.be.visible');
      partials.cookieBanner.cookiesLink().should('not.be.visible');

      partials.cookieBanner.question.copy1().should('not.exist');
      partials.cookieBanner.question.copy2().should('not.exist');
      partials.cookieBanner.question.acceptButton().should('not.exist');
      partials.cookieBanner.question.rejectButton().should('not.exist');

      partials.cookieBanner.accepted.copy().should('not.be.visible');
    });
  });

  describe('after accepting cookies and navigating to another page', () => {
    beforeEach(() => {
      cy.clearCookies();

      cy.navigateToUrl(url);

      partials.cookieBanner.question.acceptButton().click();
      partials.cookieBanner.hideButton().click();
      completeAndSubmitBuyerCountryForm({});
    });

    it('should not render any banner elements', () => {
      partials.cookieBanner.heading().should('not.exist');
      partials.cookieBanner.hideButton().should('not.exist');
      partials.cookieBanner.cookiesLink().should('not.exist');

      partials.cookieBanner.question.copy1().should('not.exist');
      partials.cookieBanner.question.copy2().should('not.exist');
      partials.cookieBanner.question.acceptButton().should('not.exist');
      partials.cookieBanner.question.rejectButton().should('not.exist');

      partials.cookieBanner.accepted.copy().should('not.exist');
    });

    it('should render a google analytics and google tag manager scripts', () => {
      cy.checkAnalyticsScriptsAreRendered();
    });

    it('should retain an EXIP analytics consent cookie with a value of true', () => {
      cy.checkAnalyticsCookieIsTrue();
    });
  });
});

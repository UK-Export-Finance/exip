import { cookieBanner } from '../../../../../../partials';
import { COOKIES_CONSENT } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';

const baseUrl = Cypress.config('baseUrl');

context('Cookies consent - accept', () => {
  const url = `${baseUrl}${ROUTES.QUOTE.BUYER_COUNTRY}`;

  beforeEach(() => {
    cy.navigateToRootUrl();

    cy.assertUrl(url);
  });

  describe('when clicking `accept cookies` button', () => {
    beforeEach(() => {
      cy.clearCookies();

      cy.navigateToUrl(url);

      cookieBanner.question.acceptButton().click();
    });

    it('should remain on the same page', () => {
      const expectedUrl = `${baseUrl}${ROUTES.QUOTE.BUYER_COUNTRY}`;

      cy.assertUrl(expectedUrl);
    });

    it('should not render the question banner', () => {
      cookieBanner.question.copy().should('not.exist');
      cookieBanner.question.acceptButton().should('not.exist');
      cookieBanner.question.rejectButton().should('not.exist');
    });

    it('should render `accepted` banner', () => {
      cookieBanner.heading().should('exist');

      cookieBanner.accepted.copy().should('exist');

      const { ACCEPTED } = COOKIES_CONSENT;
      const expected = `${ACCEPTED.COPY_1} ${COOKIES_CONSENT.COOKIES_LINK} ${ACCEPTED.COPY_2}`;

      cy.checkText(cookieBanner.accepted.copy(), expected);

      cy.checkLink(cookieBanner.cookiesLink(), ROUTES.COOKIES, COOKIES_CONSENT.COOKIES_LINK);

      cy.checkText(cookieBanner.hideButton(), COOKIES_CONSENT.HIDE_BUTTON);
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

      cookieBanner.question.acceptButton().click();
      cookieBanner.hideButton().click();
    });

    it('should hide all banner elements', () => {
      cookieBanner.heading().should('not.be.visible');
      cookieBanner.hideButton().should('not.be.visible');
      cookieBanner.cookiesLink().should('not.be.visible');

      cookieBanner.question.copy().should('not.exist');
      cookieBanner.question.acceptButton().should('not.exist');
      cookieBanner.question.rejectButton().should('not.exist');

      cookieBanner.accepted.copy().should('not.be.visible');
    });
  });

  describe('after accepting cookies and navigating to another page', () => {
    beforeEach(() => {
      cy.clearCookies();

      cy.navigateToUrl(url);

      cookieBanner.question.acceptButton().click();
      cookieBanner.hideButton().click();
      cy.completeAndSubmitBuyerCountryForm({});
    });

    it('should not render any banner elements', () => {
      cookieBanner.heading().should('not.exist');
      cookieBanner.hideButton().should('not.exist');
      cookieBanner.cookiesLink().should('not.exist');

      cookieBanner.question.copy().should('not.exist');
      cookieBanner.question.acceptButton().should('not.exist');
      cookieBanner.question.rejectButton().should('not.exist');

      cookieBanner.accepted.copy().should('not.exist');
    });

    it('should render a google analytics and google tag manager scripts', () => {
      cy.checkAnalyticsScriptsAreRendered();
    });

    it('should retain an EXIP analytics consent cookie with a value of true', () => {
      cy.checkAnalyticsCookieIsTrue();
    });
  });
});

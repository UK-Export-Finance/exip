import { cookieBanner } from '../../../../../../partials';
import { COOKIES_CONSENT } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';

const baseUrl = Cypress.config('baseUrl');

context('Cookies consent - reject', () => {
  const url = `${baseUrl}${ROUTES.QUOTE.BUYER_COUNTRY}`;

  beforeEach(() => {
    cy.navigateToRootUrl();

    cy.assertUrl(url);
  });

  describe('when clicking `reject cookies` button', () => {
    beforeEach(() => {
      cy.clearCookies();

      cy.navigateToUrl(url);

      cookieBanner.question.rejectButton().click();
    });

    it('should remain on the same page', () => {
      const expectedUrl = `${baseUrl}${ROUTES.QUOTE.BUYER_COUNTRY}`;

      cy.assertUrl(expectedUrl);
    });

    it('should not render the question banner', () => {
      cookieBanner.question.copy().should('not.exist');
      cookieBanner.question.rejectButton().should('not.exist');
      cookieBanner.question.rejectButton().should('not.exist');
    });

    it('should render `rejected` banner', () => {
      cookieBanner.heading().should('exist');

      cookieBanner.rejected.copy().should('exist');

      const { REJECTED } = COOKIES_CONSENT;
      const expected = `${REJECTED.COPY_1} ${COOKIES_CONSENT.COOKIES_LINK} ${REJECTED.COPY_2}`;
      cy.checkText(cookieBanner.rejected.copy(), expected);

      cy.checkLink(cookieBanner.cookiesLink(), ROUTES.COOKIES, COOKIES_CONSENT.COOKIES_LINK);

      cookieBanner.hideButton().should('exist');
      cy.checkText(cookieBanner.hideButton(), COOKIES_CONSENT.HIDE_BUTTON);
    });

    it('should NOT render a google tag manager script and data layer script', () => {
      cy.checkAnalyticsScriptsAreNotRendered();
    });

    it('should add an EXIP analytics consent cookie with a value of false', () => {
      cy.checkAnalyticsCookieIsFalse();
    });
  });

  describe('when clicking `hide this message` button', () => {
    beforeEach(() => {
      cy.clearCookies();

      cy.navigateToUrl(url);

      cookieBanner.question.rejectButton().click();
      cookieBanner.hideButton().click();
    });

    it('should hide all banner elements', () => {
      cookieBanner.heading().should('not.be.visible');
      cookieBanner.hideButton().should('not.be.visible');
      cookieBanner.cookiesLink().should('not.be.visible');

      cookieBanner.question.copy().should('not.exist');
      cookieBanner.question.rejectButton().should('not.exist');
      cookieBanner.question.rejectButton().should('not.exist');

      cookieBanner.rejected.copy().should('not.be.visible');
    });
  });

  describe('after rejecting cookies and navigating to another page', () => {
    beforeEach(() => {
      cy.clearCookies();

      cy.navigateToUrl(url);

      cookieBanner.question.rejectButton().click();
      cookieBanner.hideButton().click();
      cy.completeAndSubmitBuyerCountryForm({});
    });

    it('should not render any banner elements', () => {
      cookieBanner.heading().should('not.exist');
      cookieBanner.hideButton().should('not.exist');
      cookieBanner.cookiesLink().should('not.exist');

      cookieBanner.question.copy().should('not.exist');
      cookieBanner.question.rejectButton().should('not.exist');
      cookieBanner.question.rejectButton().should('not.exist');

      cookieBanner.rejected.copy().should('not.exist');
    });

    it('should NOT render a google tag manager script and data layer script', () => {
      cy.checkAnalyticsScriptsAreNotRendered();
    });

    it('should retain an EXIP analytics consent cookie with a value of false', () => {
      cy.checkAnalyticsCookieIsFalse();
    });
  });
});

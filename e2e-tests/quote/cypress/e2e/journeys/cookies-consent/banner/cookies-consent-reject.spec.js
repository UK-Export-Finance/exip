import partials from '../../../../../../partials';
import { COOKIES_CONSENT } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';

const baseUrl = Cypress.config('baseUrl');

context('Cookies consent - reject', () => {
  const url = `${baseUrl}${ROUTES.QUOTE.BUYER_COUNTRY}`;

  beforeEach(() => {
    cy.login();

    cy.assertUrl(url);
  });

  describe('when clicking `reject cookies` button', () => {
    beforeEach(() => {
      cy.clearCookies();

      cy.navigateToUrl(url);

      partials.cookieBanner.question.rejectButton().click();
    });

    it('should remain on the same page', () => {
      const expectedUrl = `${baseUrl}${ROUTES.QUOTE.BUYER_COUNTRY}`;

      cy.assertUrl(expectedUrl);
    });

    it('should not render the question banner', () => {
      partials.cookieBanner.question.copy1().should('not.exist');
      partials.cookieBanner.question.copy2().should('not.exist');
      partials.cookieBanner.question.rejectButton().should('not.exist');
      partials.cookieBanner.question.rejectButton().should('not.exist');
    });

    it('should render `rejected` banner', () => {
      partials.cookieBanner.heading().should('exist');

      partials.cookieBanner.rejected.copy().should('exist');

      const { REJECTED } = COOKIES_CONSENT;
      const expected = `${REJECTED.COPY_1} ${COOKIES_CONSENT.COOKIES_LINK} ${REJECTED.COPY_2}`;
      cy.checkText(partials.cookieBanner.rejected.copy(), expected);

      cy.checkLink(
        partials.cookieBanner.cookiesLink(),
        ROUTES.COOKIES,
        COOKIES_CONSENT.COOKIES_LINK,
      );

      partials.cookieBanner.hideButton().should('exist');
      cy.checkText(partials.cookieBanner.hideButton(), COOKIES_CONSENT.HIDE_BUTTON);
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

      partials.cookieBanner.question.rejectButton().click();
      partials.cookieBanner.hideButton().click();
    });

    it('should hide all banner elements', () => {
      partials.cookieBanner.heading().should('not.be.visible');
      partials.cookieBanner.hideButton().should('not.be.visible');
      partials.cookieBanner.cookiesLink().should('not.be.visible');

      partials.cookieBanner.question.copy1().should('not.exist');
      partials.cookieBanner.question.copy2().should('not.exist');
      partials.cookieBanner.question.rejectButton().should('not.exist');
      partials.cookieBanner.question.rejectButton().should('not.exist');

      partials.cookieBanner.rejected.copy().should('not.be.visible');
    });
  });

  describe('after rejecting cookies and navigating to another page', () => {
    beforeEach(() => {
      cy.clearCookies();

      cy.navigateToUrl(url);

      partials.cookieBanner.question.rejectButton().click();
      partials.cookieBanner.hideButton().click();
      completeAndSubmitBuyerCountryForm();
    });

    it('should not render any banner elements', () => {
      partials.cookieBanner.heading().should('not.exist');
      partials.cookieBanner.hideButton().should('not.exist');
      partials.cookieBanner.cookiesLink().should('not.exist');

      partials.cookieBanner.question.copy1().should('not.exist');
      partials.cookieBanner.question.copy2().should('not.exist');
      partials.cookieBanner.question.rejectButton().should('not.exist');
      partials.cookieBanner.question.rejectButton().should('not.exist');

      partials.cookieBanner.rejected.copy().should('not.exist');
    });

    it('should NOT render a google tag manager script and data layer script', () => {
      cy.checkAnalyticsScriptsAreNotRendered();
    });

    it('should retain an EXIP analytics consent cookie with a value of false', () => {
      cy.checkAnalyticsCookieIsFalse();
    });
  });
});

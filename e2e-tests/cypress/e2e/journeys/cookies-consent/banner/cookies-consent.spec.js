import partials from '../../../partials';
import { COOKIES_CONSENT, PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

context('Cookies consent - initial/default', () => {
  beforeEach(() => {
    cy.login();

    cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);
  });

  describe('question banner', () => {
    it('should render a heading', () => {
      partials.cookieBanner.heading().should('exist');
    });

    it('should render copy', () => {
      partials.cookieBanner.question.copy1().should('exist');
      partials.cookieBanner.question.copy1().invoke('text').then((text) => {
        expect(text.trim()).equal(COOKIES_CONSENT.QUESTION.COPY_1);
      });

      partials.cookieBanner.question.copy2().should('exist');
      partials.cookieBanner.question.copy2().invoke('text').then((text) => {
        expect(text.trim()).equal(COOKIES_CONSENT.QUESTION.COPY_2);
      });
    });

    it('should render an `accept` button', () => {
      partials.cookieBanner.question.acceptButton().should('exist');
      partials.cookieBanner.question.acceptButton().invoke('text').then((text) => {
        expect(text.trim()).equal(COOKIES_CONSENT.QUESTION.ACCEPT_BUTTON);
      });
    });

    it('should render a `reject` button', () => {
      partials.cookieBanner.question.rejectButton().should('exist');
      partials.cookieBanner.question.rejectButton().invoke('text').then((text) => {
        expect(text.trim()).equal(COOKIES_CONSENT.QUESTION.REJECT_BUTTON);
      });
    });

    it('should render a link to cookies', () => {
      partials.cookieBanner.cookiesLink().should('exist');
      partials.cookieBanner.cookiesLink().invoke('text').then((text) => {
        expect(text.trim()).equal(COOKIES_CONSENT.QUESTION.VIEW_COOKIES);
      });

      partials.cookieBanner.cookiesLink().should('have.attr', 'href', ROUTES.COOKIES);
    });

    it('should redirect to cookies page when clicking cookies link', () => {
      partials.cookieBanner.cookiesLink().click();
      cy.url().should('include', ROUTES.COOKIES);
    });
  });

  it('should NOT render any scripts that contain `google` or `G-`', ( ) => {
    cy.checkAnalyticsScriptsAreNotRendered();
  });

  it('should NOT have any EXIP analytics cookies', () => {
    cy.checkAnalyticsCookieDoesNotExist();
  });
});

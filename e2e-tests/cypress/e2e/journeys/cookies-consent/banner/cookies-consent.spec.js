import partials from '../../../partials';
import { COOKIES_CONSENT, PAGES, PRODUCT } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

context('Cookies consent - initial/default', () => {
  beforeEach(() => {
    cy.login();

    cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);
  });

  describe('question banner', () => {
    describe('heading', () => {
      it('should render a heading when on a Quote page/root', () => {

        partials.cookieBanner.heading().invoke('text').then((text) => {
          expect(text.trim()).equal(`${COOKIES_CONSENT.HEADING_INTRO} ${PRODUCT.DESCRIPTION.QUOTE}`);
        });
      });

      it('should render a heading when on an Insurance/application page', () => {
        cy.visit(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, {
          auth: {
            username: Cypress.config('basicAuthKey'),
            password: Cypress.config('basicAuthSecret'),
          },
        });

        partials.cookieBanner.heading().invoke('text').then((text) => {
          expect(text.trim()).equal(`${COOKIES_CONSENT.HEADING_INTRO} ${PRODUCT.DESCRIPTION.APPLICATION}`);
        });
      });

      it('should render a heading when on an root page', () => {
        cy.visit(ROUTES.COOKIES, {
          auth: {
            username: Cypress.config('basicAuthKey'),
            password: Cypress.config('basicAuthSecret'),
          },
        });

        partials.cookieBanner.heading().invoke('text').then((text) => {
          expect(text.trim()).equal(`${COOKIES_CONSENT.HEADING_INTRO} ${PRODUCT.DESCRIPTION.GENERIC}`);
        });

        cy.login();
      });
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

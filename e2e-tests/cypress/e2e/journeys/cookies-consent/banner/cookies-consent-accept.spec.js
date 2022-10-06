import partials from '../../../partials';
import { COOKIES_CONSENT, PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/quote/forms';

context('Cookies consent - accept', () => {
  beforeEach(() => {
    cy.login();

    cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);
  });

  describe('when clicking `accept cookies` button', () => {
    beforeEach(() => {
      partials.cookieBanner.question.acceptButton().click();
    });

    it('should remain on the same page', () => {
      cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);
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
      partials.cookieBanner.accepted.copy().invoke('text').then((text) => {

        const { ACCEPTED } = COOKIES_CONSENT;
        const expected = `${ACCEPTED.COPY_1} ${COOKIES_CONSENT.COOKIES_LINK} ${ACCEPTED.COPY_2}`;

        expect(text.trim()).equal(expected);
      });

      partials.cookieBanner.cookiesLink().should('exist');
      partials.cookieBanner.cookiesLink().invoke('text').then((text) => {
        expect(text.trim()).equal(COOKIES_CONSENT.COOKIES_LINK);
      });
      partials.cookieBanner.cookiesLink().should('have.attr', 'href', ROUTES.COOKIES);

      partials.cookieBanner.hideButton().should('exist');
      partials.cookieBanner.hideButton().invoke('text').then((text) => {
        expect(text.trim()).equal(COOKIES_CONSENT.HIDE_BUTTON);
      });
    });

    it('should render a google tag manager script and data layer script', () => {
      cy.checkAnalyticsScriptsAreNotRendered();
    });

    it('should add an EXIP analytics consent cookie with a value of true', () => {
      cy.checkAnalyticsCookieIsTrue();
    });
  });

  describe('when clicking `hide this message` button', () => {
    beforeEach(() => {
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
      partials.cookieBanner.question.acceptButton().click();
      partials.cookieBanner.hideButton().click();
      completeAndSubmitBuyerCountryForm();
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

    it('should render a google tag manager script and data layer script', () => {
      cy.checkAnalyticsScriptsAreRendered();
    });

    it('should retain an EXIP analytics consent cookie with a value of true', () => {
      cy.checkAnalyticsCookieIsTrue();
    });
  });

  describe('after accepting cookies and manually navigating to another page via URL', () => {
    beforeEach(() => {
      partials.cookieBanner.question.acceptButton().click();
      partials.cookieBanner.hideButton().click();

      completeAndSubmitBuyerCountryForm();
      cy.visit(ROUTES.QUOTE.BUYER_COUNTRY, {
        auth: {
          username: Cypress.config('basicAuthKey'),
          password: Cypress.config('basicAuthSecret'),
        },
      });
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

    it('should render a google tag manager script and data layer script', () => {
      cy.checkAnalyticsScriptsAreRendered();
    });

    it('should retain an EXIP analytics consent cookie with a value of true', () => {
      cy.checkAnalyticsCookieIsTrue();
    }); 
  });
});

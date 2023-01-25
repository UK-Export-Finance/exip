import partials from '../../../partials';
import { COOKIES_CONSENT, PRODUCT } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

context('Cookies consent - initial/default', () => {
  beforeEach(() => {
    cy.login();

    cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);
  });

  describe('question banner', () => {
    describe('heading', () => {
      it('should render a heading when on a Quote page/root', () => {
        cy.checkText(partials.cookieBanner.heading(), `${COOKIES_CONSENT.HEADING_INTRO} ${PRODUCT.DESCRIPTION.QUOTE}`);
      });

      it('should render a heading when on an Insurance/application page', () => {
        cy.navigateToUrl(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE);

        cy.checkText(partials.cookieBanner.heading(), `${COOKIES_CONSENT.HEADING_INTRO} ${PRODUCT.DESCRIPTION.APPLICATION}`);
      });

      it('should render a heading when on an root page', () => {
        cy.navigateToUrl(ROUTES.COOKIES);

        cy.checkText(partials.cookieBanner.heading(), `${COOKIES_CONSENT.HEADING_INTRO} ${PRODUCT.DESCRIPTION.GENERIC}`);

        cy.login();
      });
    });

    it('should render copy', () => {
      partials.cookieBanner.question.copy1().should('exist');
      cy.checkText(partials.cookieBanner.question.copy1(), COOKIES_CONSENT.QUESTION.COPY_1);

      partials.cookieBanner.question.copy2().should('exist');
      cy.checkText(partials.cookieBanner.question.copy2(), COOKIES_CONSENT.QUESTION.COPY_2);
    });

    it('should render an `accept` button', () => {
      partials.cookieBanner.question.acceptButton().should('exist');
      cy.checkText(partials.cookieBanner.question.acceptButton(), COOKIES_CONSENT.QUESTION.ACCEPT_BUTTON);
    });

    it('should render a `reject` button', () => {
      partials.cookieBanner.question.rejectButton().should('exist');
      cy.checkText(partials.cookieBanner.question.rejectButton(), COOKIES_CONSENT.QUESTION.REJECT_BUTTON);
    });

    it('should render a link to cookies', () => {
      partials.cookieBanner.cookiesLink().should('exist');
      cy.checkText(partials.cookieBanner.cookiesLink(), COOKIES_CONSENT.QUESTION.VIEW_COOKIES);

      partials.cookieBanner.cookiesLink().should('have.attr', 'href', ROUTES.COOKIES);
    });

    it('should redirect to cookies page when clicking cookies link', () => {
      partials.cookieBanner.cookiesLink().click();
      cy.url().should('include', ROUTES.COOKIES);
    });
  });

  it('should NOT render any scripts that contain `google` or `G-`', () => {
    cy.checkAnalyticsScriptsAreNotRendered();
  });

  it('should NOT have any EXIP analytics cookies', () => {
    cy.checkAnalyticsCookieDoesNotExist();
  });
});

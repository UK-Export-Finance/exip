import partials from '../../partials';
import { ROUTES } from '../../constants';
import { COOKIES_CONSENT } from '../../content-strings';

const checkCookiesConsentBannerIsVisible = () => {
  partials.cookieBanner.heading().should('exist');

  partials.cookieBanner.question.copy1().should('exist');
  cy.checkText(partials.cookieBanner.question.copy1(), COOKIES_CONSENT.QUESTION.COPY_1);

  partials.cookieBanner.question.copy2().should('exist');
  cy.checkText(partials.cookieBanner.question.copy2(), COOKIES_CONSENT.QUESTION.COPY_2);

  partials.cookieBanner.question.acceptButton().should('exist');
  cy.checkText(partials.cookieBanner.question.acceptButton(), COOKIES_CONSENT.QUESTION.ACCEPT_BUTTON);

  partials.cookieBanner.question.rejectButton().should('exist');
  cy.checkText(partials.cookieBanner.question.rejectButton(), COOKIES_CONSENT.QUESTION.REJECT_BUTTON);

  cy.checkLink(
    partials.cookieBanner.cookiesLink(),
    ROUTES.COOKIES,
    COOKIES_CONSENT.QUESTION.VIEW_COOKIES,
  );
};

export default checkCookiesConsentBannerIsVisible;

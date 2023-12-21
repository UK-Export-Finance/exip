import partials from '../../partials';
import { ROUTES } from '../../constants';
import { COOKIES_CONSENT } from '../../content-strings';

const checkCookiesConsentBannerIsVisible = () => {
  partials.cookieBanner.heading().should('exist');

  cy.checkText(partials.cookieBanner.question.copy(), COOKIES_CONSENT.QUESTION.COPY);

  cy.checkText(partials.cookieBanner.question.acceptButton(), COOKIES_CONSENT.QUESTION.ACCEPT_BUTTON);

  cy.checkText(partials.cookieBanner.question.rejectButton(), COOKIES_CONSENT.QUESTION.REJECT_BUTTON);

  cy.checkLink(
    partials.cookieBanner.cookiesLink(),
    ROUTES.COOKIES,
    COOKIES_CONSENT.QUESTION.VIEW_COOKIES,
  );
};

export default checkCookiesConsentBannerIsVisible;

import { cookieBanner } from '../../partials';
import { ROUTES } from '../../constants';

import { COOKIES_CONSENT } from '../../content-strings';

/**
 * checkCookiesConsentBannerIsVisible
 * Check that the "cookies consent" banner is visible, and has the correct elements.
 * @param {Boolean} isInsurancePage: Current page is an "insurance" page.
 */
const checkCookiesConsentBannerIsVisible = ({ isInsurancePage }) => {
  cookieBanner.heading().should('exist');

  cy.checkText(cookieBanner.question.copy(), COOKIES_CONSENT.QUESTION.COPY);

  cy.checkText(cookieBanner.question.acceptButton(), COOKIES_CONSENT.QUESTION.ACCEPT_BUTTON);

  cy.checkText(cookieBanner.question.rejectButton(), COOKIES_CONSENT.QUESTION.REJECT_BUTTON);

  const expectedLink = isInsurancePage ? ROUTES.INSURANCE.COOKIES : ROUTES.COOKIES;

  cy.checkLink(cookieBanner.cookiesLink(), expectedLink, COOKIES_CONSENT.QUESTION.VIEW_COOKIES);
};

export default checkCookiesConsentBannerIsVisible;

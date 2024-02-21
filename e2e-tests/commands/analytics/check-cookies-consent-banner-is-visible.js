import partials from '../../partials';
import { ROUTES } from '../../constants';

import { COOKIES_CONSENT } from '../../content-strings';

/**
 * checkCookiesConsentBannerIsVisible
 * Check that the "cookies consent" banner is visible, and has the correct elements.
 * @param {Boolean} isInsurancePage: Current page is an "insurance" page.
 */
const checkCookiesConsentBannerIsVisible = ({ isInsurancePage }) => {
  partials.cookieBanner.heading().should('exist');

  cy.checkText(partials.cookieBanner.question.copy(), COOKIES_CONSENT.QUESTION.COPY);

  cy.checkText(partials.cookieBanner.question.acceptButton(), COOKIES_CONSENT.QUESTION.ACCEPT_BUTTON);

  cy.checkText(partials.cookieBanner.question.rejectButton(), COOKIES_CONSENT.QUESTION.REJECT_BUTTON);

  let expectedLink;

  if (isInsurancePage) {
    expectedLink = ROUTES.INSURANCE.COOKIES;
  } else {
    expectedLink = ROUTES.COOKIES;
  }

  cy.checkLink(
    partials.cookieBanner.cookiesLink(),
    expectedLink,
    COOKIES_CONSENT.QUESTION.VIEW_COOKIES,
  );
};

export default checkCookiesConsentBannerIsVisible;

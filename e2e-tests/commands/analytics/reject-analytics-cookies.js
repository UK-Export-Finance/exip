import { cookieBanner } from '../../partials';
import checkCookiesConsentBannerIsNotVisible from './check-cookies-consent-banner-is-not-visible';
import { COOKIE } from '../../constants';

const clearCookies = () => {
  cy.clearCookie(COOKIE.NAME.OPTION);
};

const refreshPage = () => {
  cy.url().then((currentUrl) => {
    cy.navigateToUrl(currentUrl);
  });
};

const reject = () => {
  cookieBanner.question.rejectButton().click();
  cookieBanner.hideButton().click();
};

const rejectAnalyticsCookies = () => {
  clearCookies();
  refreshPage();
  reject();

  checkCookiesConsentBannerIsNotVisible();
  cookieBanner.accepted.copy().should('not.exist');
  cookieBanner.rejected.copy().should('not.be.visible');
};

export default rejectAnalyticsCookies;

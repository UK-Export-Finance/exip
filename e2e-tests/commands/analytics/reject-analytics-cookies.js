import partials from '../../partials';
import checkCookiesConsentBannerIsNotVisible from './check-cookies-consent-banner-is-not-visible';

const clearCookies = () => {
  cy.clearCookie('optionalCookies');
};

const refreshPage = () => {
  cy.url().then((currentUrl) => {
    cy.navigateToUrl(currentUrl);
  });
};

const reject = () => {
  partials.cookieBanner.question.rejectButton().click();
  partials.cookieBanner.hideButton().click();
};

const rejectAnalyticsCookies = () => {
  clearCookies();
  refreshPage();
  reject();

  checkCookiesConsentBannerIsNotVisible();
  partials.cookieBanner.accepted.copy().should('not.exist');
  partials.cookieBanner.rejected.copy().should('not.be.visible');
};

export default rejectAnalyticsCookies;

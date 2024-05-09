import partials from '../../partials';
import checkCookiesConsentBannerIsVisible from './check-cookies-consent-banner-is-visible';
import checkCookiesConsentBannerIsNotVisible from './check-cookies-consent-banner-is-not-visible';

const accept = () => {
  partials.cookieBanner.question.acceptButton().click();
  partials.cookieBanner.hideButton().click();
};

/**
 * checkAnalyticsCookiesConsentAndAccept
 * Check analytics cookies consent banner contents and accept the cookies.
 * @param {Boolean} isInsurancePage: Current page is an "insurance" page.
 */
const checkAnalyticsCookiesConsentAndAccept = ({ isInsurancePage }) => {
  checkCookiesConsentBannerIsVisible({ isInsurancePage });
  accept();
  checkCookiesConsentBannerIsNotVisible();

  partials.cookieBanner.rejected.copy().should('not.exist');
  partials.cookieBanner.accepted.copy().should('not.be.visible');
};

export default checkAnalyticsCookiesConsentAndAccept;

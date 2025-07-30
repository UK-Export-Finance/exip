import { cookieBanner } from '../../partials';
import checkCookiesConsentBannerIsVisible from './check-cookies-consent-banner-is-visible';
import checkCookiesConsentBannerIsNotVisible from './check-cookies-consent-banner-is-not-visible';

const accept = () => {
  cookieBanner.question.acceptButton().click();
  cookieBanner.hideButton().click();
};

/**
 * checkAnalyticsCookiesConsentAndAccept
 * Check analytics cookies consent banner contents and accept the cookies.
 * @param {boolean} isInsurancePage: Current page is an "insurance" page.
 */
const checkAnalyticsCookiesConsentAndAccept = ({ isInsurancePage }) => {
  checkCookiesConsentBannerIsVisible({ isInsurancePage });
  accept();
  checkCookiesConsentBannerIsNotVisible();

  cookieBanner.rejected.copy().should('not.exist');
  cookieBanner.accepted.copy().should('not.be.visible');
};

export default checkAnalyticsCookiesConsentAndAccept;

import partials from '../../partials';
import checkCookiesConsentBannerIsVisible from './check-cookies-consent-banner-is-visible';
import checkCookiesConsentBannerIsNotVisible from './check-cookies-consent-banner-is-not-visible';

const accept = () => {
  partials.cookieBanner.question.acceptButton().click();
  partials.cookieBanner.hideButton().click();
};

const checkAnalyticsCookiesConsentAndAccept = () => {
  checkCookiesConsentBannerIsVisible();
  accept();
  checkCookiesConsentBannerIsNotVisible();

  partials.cookieBanner.rejected.copy().should('not.exist');
  partials.cookieBanner.accepted.copy().should('not.be.visible');
};

export default checkAnalyticsCookiesConsentAndAccept;

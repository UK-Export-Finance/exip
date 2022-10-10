import checkAnalyticsCookiesConsentAndAccept from './check-analytics-cookies-consent-and-accept';
import checkAnalyticsCookieDoesNotExist from './check-analytics-cookie-does-not-exist';
import checkAnalyticsCookieIsFalse from './check-analytics-cookie-is-false';
import checkAnalyticsCookieIsTrue from './check-analytics-cookie-is-true';
import checkAnalyticsScriptsAreNotRendered from './check-analytics-scripts-are-not-rendered';
import checkAnalyticsScriptsAreRendered from './check-analytics-scripts-are-rendered';
import checkCookiesConsentBannerIsNotVisible from './check-cookies-consent-banner-is-not-visible';
import checkCookiesConsentBannerIsVisible from './check-cookies-consent-banner-is-visible';
import checkCookiesConsentBannerDoesNotExist from './check-cookies-consent-banner-does-not-exist';
import rejectAnalyticsCookies from './reject-analytics-cookies';

const analytics = {
  checkAnalyticsCookiesConsentAndAccept,
  checkAnalyticsCookieDoesNotExist,
  checkAnalyticsCookieIsFalse,
  checkAnalyticsCookieIsTrue,
  checkAnalyticsScriptsAreNotRendered,
  checkAnalyticsScriptsAreRendered,
  checkCookiesConsentBannerIsNotVisible,
  checkCookiesConsentBannerIsVisible,
  checkCookiesConsentBannerDoesNotExist,
  rejectAnalyticsCookies,
};

export default analytics;

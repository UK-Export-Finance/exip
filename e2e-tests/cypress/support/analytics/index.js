import checkAnalyticsCookiesConsentAndAccept from './check-analytics-cookies-consent-and-accept';
import checkAnalyticsCookieDoesNotExist from './check-analytics-cookie-does-not-exist';
import checkAnalyticsCookieIsFalse from './check-analytics-cookie-is-false';
import checkAnalyticsCookieIsTrue from './check-analytics-cookie-is-true';
import checkAnalyticsScriptsAreNotRendered from './check-analytics-scripts-are-not-rendered';
import checkAnalyticsScriptsAreRendered from './check-analytics-scripts-are-rendered';
import rejectAnalyticsCookies from './reject-analytics-cookies';

const analytics = {
  checkAnalyticsCookiesConsentAndAccept,
  checkAnalyticsCookieDoesNotExist,
  checkAnalyticsCookieIsFalse,
  checkAnalyticsCookieIsTrue,
  checkAnalyticsScriptsAreNotRendered,
  checkAnalyticsScriptsAreRendered,
  rejectAnalyticsCookies,
};

export default analytics;

import { get, post } from '../../test-mocks/mock-router';
import { ROUTES } from '../../constants';
import rootGet from '../../controllers/root';
import { get as accessibilityStatementGet } from '../../controllers/root/accessibility-statement';
import { get as cookiesGet, post as cookiesPost } from '../../controllers/root/cookies';
import { get as cookiesSavedGet } from '../../controllers/root/cookies/saved';
import cookiesConsentPost from '../../controllers/root/cookies-consent';
import { get as contactUsGet } from '../../controllers/root/contact-us';
import problemWithServiceGet from '../../controllers/root/problem-with-service';

describe('routes/index', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(11);
    expect(post).toHaveBeenCalledTimes(4);

    expect(get).toHaveBeenCalledWith(ROUTES.ROOT, rootGet);

    expect(get).toHaveBeenCalledWith(ROUTES.ACCESSIBILITY_STATEMENT, accessibilityStatementGet);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ACCESSIBILITY_STATEMENT, accessibilityStatementGet);

    expect(get).toHaveBeenCalledWith(ROUTES.COOKIES, cookiesGet);
    expect(post).toHaveBeenCalledWith(ROUTES.COOKIES, cookiesPost);
    expect(get).toHaveBeenCalledWith(ROUTES.COOKIES_SAVED, cookiesSavedGet);
    expect(post).toHaveBeenCalledWith(ROUTES.COOKIES_CONSENT, cookiesConsentPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.COOKIES, cookiesGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.COOKIES, cookiesPost);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.COOKIES_SAVED, cookiesSavedGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.COOKIES_CONSENT, cookiesConsentPost);

    expect(get).toHaveBeenCalledWith(ROUTES.CONTACT_US, contactUsGet);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.CONTACT_US, contactUsGet);

    expect(get).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceGet);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.PROBLEM_WITH_SERVICE, problemWithServiceGet);
  });
});

import { get, post } from '../../test-mocks/mock-router';
import { ROUTES } from '../../constants';
import rootGet from '../../controllers/root';
import { get as accessibilityStatementGet } from '../../controllers/root/accessibility-statement';
import { get as cookiesGet, post as cookiesPost } from '../../controllers/root/cookies';
import cookiesConsentPost from '../../controllers/root/cookies-consent';
import problemWithServiceGet from '../../controllers/quote/problem-with-service';

describe('routes/index', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(4);
    expect(post).toHaveBeenCalledTimes(2);

    expect(get).toHaveBeenCalledWith(ROUTES.ROOT, rootGet);

    expect(get).toHaveBeenCalledWith(ROUTES.ACCESSIBILITY_STATEMENT, accessibilityStatementGet);

    expect(get).toHaveBeenCalledWith(ROUTES.COOKIES, cookiesGet);
    expect(post).toHaveBeenCalledWith(ROUTES.COOKIES, cookiesPost);

    expect(post).toHaveBeenCalledWith(ROUTES.COOKIES_CONSENT, cookiesConsentPost);

    expect(get).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceGet);
  });
});

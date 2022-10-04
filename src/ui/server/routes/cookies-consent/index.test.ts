import { post } from '../../test-mocks/mock-router';
import { ROUTES } from '../../constants';
import cookiesConsentPost from '../../controllers/cookies-consent';

describe('routes/cookies-consent', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(post).toHaveBeenCalledTimes(1);

    expect(post).toHaveBeenCalledWith(ROUTES.COOKIES_CONSENT, cookiesConsentPost);
  });
});

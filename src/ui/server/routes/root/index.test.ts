import { get } from '../../test-mocks/mock-router';
import { ROUTES } from '../../constants';
import rootGet from '../../controllers/root';
import cookiesGet from '../../controllers/quote/cookies';
import problemWithServiceGet from '../../controllers/quote/problem-with-service';

describe('routes/index', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(3);

    expect(get).toHaveBeenCalledWith(ROUTES.ROOT, rootGet);
    expect(get).toHaveBeenCalledWith(ROUTES.COOKIES, cookiesGet);
    expect(get).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceGet);
  });
});

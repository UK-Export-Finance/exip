import { get, post } from '../../test-mocks/mock-router';
import { ROUTES } from '../../constants';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';

describe('routes/insurance', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(7);
    expect(post).toHaveBeenCalledTimes(5);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.START, startGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.START, startPost);
  });
});

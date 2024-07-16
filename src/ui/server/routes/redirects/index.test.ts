import { get, post } from '../../test-mocks/mock-router';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import startRedirectGet from '../../controllers/redirects/start';
import redirectGet from '../../controllers/redirects';

const { MVP_INSURANCE_ROOT, START_ROOT } = INSURANCE_ROUTES;

describe('routes/redirects', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(3);
    expect(post).toHaveBeenCalledTimes(0);

    expect(get).toHaveBeenCalledWith(`${MVP_INSURANCE_ROOT}${START_ROOT}`, startRedirectGet);
    expect(get).toHaveBeenCalledWith(`${MVP_INSURANCE_ROOT}/:referenceNumber/*`, redirectGet);
    expect(get).toHaveBeenCalledWith(`${MVP_INSURANCE_ROOT}*`, redirectGet);
  });
});

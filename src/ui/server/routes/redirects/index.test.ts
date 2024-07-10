import { get, post } from '../../test-mocks/mock-router';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import redirectGet from '../../controllers/redirects';

const { MVP_INSURANCE_ROOT } = INSURANCE_ROUTES;

describe('routes/redirects', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(2);
    expect(post).toHaveBeenCalledTimes(0);

    expect(get).toHaveBeenCalledWith(`/${MVP_INSURANCE_ROOT}/:referenceNumber/*`, redirectGet);
    expect(get).toHaveBeenCalledWith(`/${MVP_INSURANCE_ROOT}*`, redirectGet);
  });
});

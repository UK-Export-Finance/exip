import { get } from '../../test-mocks/mock-router';
import { ROUTES } from '../../constants';
import wellKnownGet from '../../controllers/well-known/security';

describe('routes/well-known', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(1);

    expect(get).toHaveBeenCalledWith(ROUTES.WELL_KNOWN.SECURITY, wellKnownGet);
  });
});

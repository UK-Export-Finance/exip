import { get } from '../../test-mocks/mock-router';
import { ROUTES } from '../../constants';
import wellknownGet from '../../controllers/wellknown/security';

describe('routes/.well-known', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('.');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(1);

    expect(get).toHaveBeenCalledWith(ROUTES.WELL_KNOWN.SECURITY, wellknownGet);
  });
});

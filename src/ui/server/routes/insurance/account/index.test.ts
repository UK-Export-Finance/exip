import { get, post } from '../../../test-mocks/mock-router';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as yourDetailsGet, post as yourDetailsPost } from '../../../controllers/insurance/account/create/your-details';

describe('routes/insurance/account', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledTimes(1);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS, yourDetailsGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS, yourDetailsPost);
  });
});

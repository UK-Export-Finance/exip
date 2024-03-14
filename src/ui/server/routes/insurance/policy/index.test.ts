import { get, post } from '../../../test-mocks/mock-router';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as policyRootGet } from '../../../controllers/insurance/policy';

describe('routes/insurance/policy', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(42);
    expect(post).toHaveBeenCalledTimes(54);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ROOT}`, policyRootGet);
  });
});

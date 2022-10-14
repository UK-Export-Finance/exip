import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';
import { get as checkIfEligibleGet, post as checkIfEligiblePost } from '../../../controllers/insurance/eligibility/check-if-eligible';

describe('routes/insurance/eligibility', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledTimes(1);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligibleGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligiblePost);
  });
});

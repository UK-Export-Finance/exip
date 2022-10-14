import { get, post } from '../../test-mocks/mock-router';
import { ROUTES } from '../../constants';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as checkIfEligibleGet, post as checkIfEligiblePost } from '../../controllers/insurance/eligibility/check-if-eligible';

describe('routes/insurance', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(2);
    expect(post).toHaveBeenCalledTimes(2);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.START, startGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.START, startPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligibleGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligiblePost);
  });
});

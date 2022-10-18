import { get, post } from '../../test-mocks/mock-router';
import { ROUTES } from '../../constants';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as checkIfEligibleGet, post as checkIfEligiblePost } from '../../controllers/insurance/eligibility/check-if-eligible';
import { get as buyerBasedGet, post as buyerBasedPost } from '../../controllers/insurance/eligibility/buyer-country';
import cannotApplyGet from '../../controllers/insurance/eligibility/cannot-apply';
import applyOfflineGet from '../../controllers/insurance/eligibility/apply-offline';

describe('routes/insurance', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(5);
    expect(post).toHaveBeenCalledTimes(3);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.START, startGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.START, startPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligibleGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligiblePost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerBasedGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerBasedPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY, cannotApplyGet);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE, applyOfflineGet);
  });
});

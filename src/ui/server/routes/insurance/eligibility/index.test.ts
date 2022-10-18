import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';
import { get as checkIfEligibleGet, post as checkIfEligiblePost } from '../../../controllers/insurance/eligibility/check-if-eligible';
import { get as buyerCountryGet, post as buyerCountryPost } from '../../../controllers/insurance/eligibility/buyer-country';
import cannotApplyGet from '../../../controllers/insurance/eligibility/cannot-apply';
import applyOfflineGet from '../../../controllers/insurance/eligibility/apply-offline';

describe('routes/insurance/eligibility', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(4);
    expect(post).toHaveBeenCalledTimes(2);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligibleGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligiblePost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY, cannotApplyGet);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE, applyOfflineGet);
  });
});

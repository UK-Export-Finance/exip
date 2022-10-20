import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';
import { get as checkIfEligibleGet, post as checkIfEligiblePost } from '../../../controllers/insurance/eligibility/check-if-eligible';
import { get as buyerCountryGet, post as buyerCountryPost } from '../../../controllers/insurance/eligibility/buyer-country';
import { get as exporterLocationGet, post as exporterLocationPost } from '../../../controllers/insurance/eligibility/exporter-location';
import { get as ukGoodsOrServicesGet, post as ukGoodsOrServicesPost } from '../../../controllers/insurance/eligibility/uk-goods-or-services';
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
    expect(get).toHaveBeenCalledTimes(6);
    expect(post).toHaveBeenCalledTimes(4);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligibleGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligiblePost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION, exporterLocationGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION, exporterLocationPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, ukGoodsOrServicesGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, ukGoodsOrServicesPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY, cannotApplyGet);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE, applyOfflineGet);
  });
});

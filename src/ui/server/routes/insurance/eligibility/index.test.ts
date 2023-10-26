import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';
import { get as checkIfEligibleGet, post as checkIfEligiblePost } from '../../../controllers/insurance/eligibility/check-if-eligible';
import { get as exporterLocationGet, post as exporterLocationPost } from '../../../controllers/insurance/eligibility/exporter-location';
import { get as companiesHouseNumberGet, post as companiesHouseNumberPost } from '../../../controllers/insurance/eligibility/companies-house-number';
import { get as buyerCountryGet, post as buyerCountryPost } from '../../../controllers/insurance/eligibility/buyer-country';
import { get as insuredAmountGet, post as insuredAmountPost } from '../../../controllers/insurance/eligibility/insured-amount';
import { get as insuredPeriodGet, post as insuredPeriodPost } from '../../../controllers/insurance/eligibility/insured-period';
import { get as ukGoodsOrServicesGet, post as ukGoodsOrServicesPost } from '../../../controllers/insurance/eligibility/uk-goods-or-services';
import { get as eligibleToApplyOnlineGet, post as eligibleToApplyOnlinePost } from '../../../controllers/insurance/eligibility/eligible-to-apply-online';
import { get as alreadyHaveAccountGet, post as alreadyHaveAccountPost } from '../../../controllers/insurance/eligibility/account-to-apply-online';
import { get as cannotApplyGet } from '../../../controllers/insurance/eligibility/cannot-apply';
import { get as needToStartAgainGet, post as needToStartAgainPost } from '../../../controllers/insurance/eligibility/need-to-start-again';

describe('routes/insurance/eligibility', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(12);
    expect(post).toHaveBeenCalledTimes(11);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligibleGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligiblePost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION, exporterLocationGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION, exporterLocationPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER, companiesHouseNumberGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER, companiesHouseNumberPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT, insuredAmountGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT, insuredAmountPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD, insuredPeriodGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD, insuredPeriodPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, ukGoodsOrServicesGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, ukGoodsOrServicesPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, eligibleToApplyOnlineGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, eligibleToApplyOnlinePost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.ACCOUNT_TO_APPLY_ONLINE, alreadyHaveAccountGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.ACCOUNT_TO_APPLY_ONLINE, alreadyHaveAccountPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY, cannotApplyGet);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN, needToStartAgainGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN, needToStartAgainPost);
  });
});

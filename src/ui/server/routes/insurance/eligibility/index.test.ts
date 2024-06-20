import { get, post } from '../../../test-mocks/mock-router';
import { ROUTES } from '../../../constants';
import { get as checkIfEligibleGet, post as checkIfEligiblePost } from '../../../controllers/insurance/eligibility/check-if-eligible';
import { get as exporterLocationGet, post as exporterLocationPost } from '../../../controllers/insurance/eligibility/exporter-location';
import { get as companiesHouseNumberGet, post as companiesHouseNumberPost } from '../../../controllers/insurance/eligibility/companies-house-number';
import { get as noCompaniesHouseNumberGet } from '../../../controllers/insurance/eligibility/no-companies-house-number';
import { get as companiesHouseSearchGet, post as companiesHouseSearchPost } from '../../../controllers/insurance/eligibility/companies-house-search';
import { get as companiesHouseUnavailableGet } from '../../../controllers/insurance/eligibility/companies-house-unavailable';
import { get as companyNotActiveGet } from '../../../controllers/insurance/eligibility/company-not-active';
import { get as companyDetailsGet, post as companyDetailsPost } from '../../../controllers/insurance/eligibility/company-details';
import { get as buyerCountryGet, post as buyerCountryPost } from '../../../controllers/insurance/eligibility/buyer-country';
import { get as totalValueInsuredGet, post as totalValueInsuredPost } from '../../../controllers/insurance/eligibility/total-value-insured';
import { get as coverPeriodGet, post as coverPeriodPost } from '../../../controllers/insurance/eligibility/cover-period';
import { get as longTermCoverGet } from '../../../controllers/insurance/eligibility/long-term-cover';
import { get as ukGoodsOrServicesGet, post as ukGoodsOrServicesPost } from '../../../controllers/insurance/eligibility/uk-goods-or-services';
import { get as endBuyerGet, post as endBuyerPost } from '../../../controllers/insurance/eligibility/end-buyer';
import { get as cannotApplyMultipleRisksGet } from '../../../controllers/insurance/eligibility/cannot-apply-multiple-risks';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/eligibility/check-your-answers';
import { get as eligibleToApplyOnlineGet, post as eligibleToApplyOnlinePost } from '../../../controllers/insurance/eligibility/eligible-to-apply-online';
import { get as haveAnAccountGet, post as haveAnAccountPost } from '../../../controllers/insurance/eligibility/do-you-have-an-account';
import { get as cannotApplyGet } from '../../../controllers/insurance/eligibility/cannot-apply';
import { get as needToStartAgainGet, post as needToStartAgainPost } from '../../../controllers/insurance/eligibility/need-to-start-again';
import { get as contractTooShortGet } from '../../../controllers/insurance/eligibility/contract-too-short';

describe('routes/insurance/eligibility', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(30);
    expect(post).toHaveBeenCalledTimes(23);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligibleGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligiblePost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION, exporterLocationGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION, exporterLocationPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER, companiesHouseNumberGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER, companiesHouseNumberPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.NO_COMPANIES_HOUSE_NUMBER, noCompaniesHouseNumberGet);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.ENTER_COMPANIES_HOUSE_NUMBER, companiesHouseSearchGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.ENTER_COMPANIES_HOUSE_NUMBER, companiesHouseSearchPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_UNAVAILABLE, companiesHouseUnavailableGet);
    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.COMPANY_NOT_ACTIVE, companyNotActiveGet);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS, companyDetailsGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS, companyDetailsPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, buyerCountryPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED, totalValueInsuredGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED, totalValueInsuredPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.COVER_PERIOD, coverPeriodGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.COVER_PERIOD, coverPeriodPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.LONG_TERM_COVER, longTermCoverGet);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, ukGoodsOrServicesGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, ukGoodsOrServicesPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.END_BUYER, endBuyerGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.END_BUYER, endBuyerPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY_MULTIPLE_RISKS, cannotApplyMultipleRisksGet);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS, checkYourAnswersGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CHECK_YOUR_ANSWERS, checkYourAnswersPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, eligibleToApplyOnlineGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, eligibleToApplyOnlinePost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT, haveAnAccountGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT, haveAnAccountPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY, cannotApplyGet);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN, needToStartAgainGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN, needToStartAgainPost);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CONTRACT_TOO_SHORT, contractTooShortGet);
  });
});

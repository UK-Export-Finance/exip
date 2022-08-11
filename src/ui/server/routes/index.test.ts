import { get, post } from '../test-mocks/mock-router';
import { ROUTES } from '../constants';
import rootGet from '../controllers/root';
import { get as buyerBasedGet, post as buyerBasedPost } from '../controllers/buyer-country';
import { get as companyBasedGet, post as companyBasedPost } from '../controllers/company-based';
import { get as canGetPrivateInsuranceGet, post as canGetPrivateInsurancePost } from '../controllers/can-get-private-insurance';
import { get as ukGoodsOrServicesGet, post as ukGoodsOrServicesPost } from '../controllers/uk-goods-or-services';
import { get as policyTypeGet, post as policyTypePost } from '../controllers/policy-type';
import { get as tellUsAboutYourPolicyGet, post as tellUsAboutYourPolicyPost } from '../controllers/tell-us-about-your-policy';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../controllers/check-your-answers';
import cannotObtainCoverGet from '../controllers/cannot-obtain-cover';
import yourQuoteGet from '../controllers/your-quote';
import cookiesGet from '../controllers/cookies';
import problemWithServiceGet from '../controllers/problem-with-service';

describe('routes/index', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(18);
    expect(post).toHaveBeenCalledTimes(13);

    expect(get).toHaveBeenCalledWith(ROUTES.ROOT, rootGet);

    expect(get).toHaveBeenCalledWith(ROUTES.BUYER_COUNTRY, buyerBasedGet);
    expect(post).toHaveBeenCalledWith(ROUTES.BUYER_COUNTRY, buyerBasedPost);
    expect(get).toHaveBeenCalledWith(ROUTES.BUYER_COUNTRY_CHANGE, buyerBasedGet);
    expect(post).toHaveBeenCalledWith(ROUTES.BUYER_COUNTRY_CHANGE, buyerBasedPost);

    expect(get).toHaveBeenCalledWith(ROUTES.COMPANY_BASED, companyBasedGet);
    expect(post).toHaveBeenCalledWith(ROUTES.COMPANY_BASED, companyBasedPost);
    expect(get).toHaveBeenCalledWith(ROUTES.COMPANY_BASED_CHANGE, companyBasedGet);
    expect(post).toHaveBeenCalledWith(ROUTES.COMPANY_BASED_CHANGE, companyBasedPost);

    expect(get).toHaveBeenCalledWith(ROUTES.CAN_GET_PRIVATE_INSURANCE, canGetPrivateInsuranceGet);
    expect(post).toHaveBeenCalledWith(ROUTES.CAN_GET_PRIVATE_INSURANCE, canGetPrivateInsurancePost);
    expect(get).toHaveBeenCalledWith(ROUTES.CAN_GET_PRIVATE_INSURANCE_CHANGE, canGetPrivateInsuranceGet);
    expect(post).toHaveBeenCalledWith(ROUTES.CAN_GET_PRIVATE_INSURANCE_CHANGE, canGetPrivateInsurancePost);

    expect(get).toHaveBeenCalledWith(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES, ukGoodsOrServicesGet);
    expect(post).toHaveBeenCalledWith(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES, ukGoodsOrServicesPost);
    expect(get).toHaveBeenCalledWith(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesGet);
    expect(post).toHaveBeenCalledWith(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesPost);

    expect(get).toHaveBeenCalledWith(ROUTES.POLICY_TYPE, policyTypeGet);
    expect(post).toHaveBeenCalledWith(ROUTES.POLICY_TYPE, policyTypePost);
    expect(get).toHaveBeenCalledWith(ROUTES.POLICY_TYPE_CHANGE, policyTypeGet);
    expect(post).toHaveBeenCalledWith(ROUTES.POLICY_TYPE_CHANGE, policyTypePost);

    expect(get).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_POLICY, tellUsAboutYourPolicyGet);
    expect(post).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_POLICY, tellUsAboutYourPolicyPost);
    expect(get).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE, tellUsAboutYourPolicyGet);
    expect(post).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE, tellUsAboutYourPolicyPost);

    expect(get).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS, checkYourAnswersGet);
    expect(post).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS, checkYourAnswersPost);

    expect(get).toHaveBeenCalledWith(ROUTES.CANNOT_OBTAIN_COVER, cannotObtainCoverGet);

    expect(get).toHaveBeenCalledWith(ROUTES.YOUR_QUOTE, yourQuoteGet);

    expect(get).toHaveBeenCalledWith(ROUTES.COOKIES, cookiesGet);

    expect(get).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceGet);
  });
});

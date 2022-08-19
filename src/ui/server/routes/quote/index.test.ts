import { get, post } from '../../test-mocks/mock-router';
import { ROUTES } from '../../constants';
import { get as buyerBasedGet, post as buyerBasedPost } from '../../controllers/quote/buyer-country';
import { get as companyBasedGet, post as companyBasedPost } from '../../controllers/quote/company-based';
import { get as ukGoodsOrServicesGet, post as ukGoodsOrServicesPost } from '../../controllers/quote/uk-goods-or-services';
import { get as policyTypeGet, post as policyTypePost } from '../../controllers/quote/policy-type';
import { get as tellUsAboutYourPolicyGet, post as tellUsAboutYourPolicyPost } from '../../controllers/quote/tell-us-about-your-policy';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../controllers/quote/check-your-answers';
import cannotObtainCoverGet from '../../controllers/quote/cannot-obtain-cover';
import getAQuoteByEmailGet from '../../controllers/quote/get-a-quote-by-email';
import yourQuoteGet from '../../controllers/quote/your-quote';
import { get as needToStartAgainGet, post as needToStartAgainPost } from '../../controllers/quote/need-to-start-again';

describe('routes/index', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(15);
    expect(post).toHaveBeenCalledTimes(12);

    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.BUYER_COUNTRY, buyerBasedGet);
    expect(post).toHaveBeenCalledWith(ROUTES.QUOTE.BUYER_COUNTRY, buyerBasedPost);
    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.BUYER_COUNTRY_CHANGE, buyerBasedGet);
    expect(post).toHaveBeenCalledWith(ROUTES.QUOTE.BUYER_COUNTRY_CHANGE, buyerBasedPost);

    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.COMPANY_BASED, companyBasedGet);
    expect(post).toHaveBeenCalledWith(ROUTES.QUOTE.COMPANY_BASED, companyBasedPost);
    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.COMPANY_BASED_CHANGE, companyBasedGet);
    expect(post).toHaveBeenCalledWith(ROUTES.QUOTE.COMPANY_BASED_CHANGE, companyBasedPost);

    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES, ukGoodsOrServicesGet);
    expect(post).toHaveBeenCalledWith(ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES, ukGoodsOrServicesPost);
    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesGet);
    expect(post).toHaveBeenCalledWith(ROUTES.QUOTE.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesPost);

    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.POLICY_TYPE, policyTypeGet);
    expect(post).toHaveBeenCalledWith(ROUTES.QUOTE.POLICY_TYPE, policyTypePost);
    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.POLICY_TYPE_CHANGE, policyTypeGet);
    expect(post).toHaveBeenCalledWith(ROUTES.QUOTE.POLICY_TYPE_CHANGE, policyTypePost);

    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, tellUsAboutYourPolicyGet);
    expect(post).toHaveBeenCalledWith(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, tellUsAboutYourPolicyPost);
    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE, tellUsAboutYourPolicyGet);
    expect(post).toHaveBeenCalledWith(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE, tellUsAboutYourPolicyPost);

    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.CHECK_YOUR_ANSWERS, checkYourAnswersGet);
    expect(post).toHaveBeenCalledWith(ROUTES.QUOTE.CHECK_YOUR_ANSWERS, checkYourAnswersPost);

    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.CANNOT_OBTAIN_COVER, cannotObtainCoverGet);

    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL, getAQuoteByEmailGet);

    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.YOUR_QUOTE, yourQuoteGet);

    expect(get).toHaveBeenCalledWith(ROUTES.QUOTE.NEED_TO_START_AGAIN, needToStartAgainGet);
    expect(post).toHaveBeenCalledWith(ROUTES.QUOTE.NEED_TO_START_AGAIN, needToStartAgainPost);
  });
});

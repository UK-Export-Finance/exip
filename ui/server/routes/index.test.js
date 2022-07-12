const {
  get,
  post,
} = require('../test-mocks/mock-router');
const { ROUTES } = require('../constants');
const guidanceController = require('../controllers/guidance');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');
const buyerBasedController = require('../controllers/buyer-country');
const canGetPrivateInsuranceController = require('../controllers/can-get-private-insurance');
const ukGoodsOrServicesController = require('../controllers/uk-goods-or-services');
const tellUsAboutYourPolicyController = require('../controllers/tell-us-about-your-policy');
const checkYourAnswersController = require('../controllers/check-your-answers');
const cannotObtainCoverController = require('../controllers/cannot-obtain-cover');
const yourQuoteController = require('../controllers/your-quote');
const problemWithServiceController = require('../controllers/problem-with-service');

describe('routes/index', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(18);
    expect(post).toHaveBeenCalledTimes(14);

    expect(get).toHaveBeenCalledWith(ROUTES.GUIDANCE, guidanceController);

    expect(get).toHaveBeenCalledWith(ROUTES.BEFORE_YOU_START, beforeYouStartController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.BEFORE_YOU_START, beforeYouStartController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.BUYER_COUNTRY, buyerBasedController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.BUYER_COUNTRY, buyerBasedController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.BUYER_COUNTRY_CHANGE, buyerBasedController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.BUYER_COUNTRY_CHANGE, buyerBasedController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.COMPANY_BASED, companyBasedController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.COMPANY_BASED, companyBasedController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.COMPANY_BASED_CHANGE, companyBasedController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.COMPANY_BASED_CHANGE, companyBasedController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.CAN_GET_PRIVATE_INSURANCE, canGetPrivateInsuranceController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.CAN_GET_PRIVATE_INSURANCE, canGetPrivateInsuranceController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.CAN_GET_PRIVATE_INSURANCE_CHANGE, canGetPrivateInsuranceController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.CAN_GET_PRIVATE_INSURANCE_CHANGE, canGetPrivateInsuranceController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.UK_GOODS_OR_SERVICES, ukGoodsOrServicesController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.UK_GOODS_OR_SERVICES, ukGoodsOrServicesController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.UK_GOODS_OR_SERVICES_CHANGE, ukGoodsOrServicesController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_POLICY, tellUsAboutYourPolicyController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_POLICY, tellUsAboutYourPolicyController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE, tellUsAboutYourPolicyController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_POLICY_CHANGE, tellUsAboutYourPolicyController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS, checkYourAnswersController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS, checkYourAnswersController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.CANNOT_OBTAIN_COVER, cannotObtainCoverController);

    expect(get).toHaveBeenCalledWith(ROUTES.YOUR_QUOTE, yourQuoteController);

    expect(get).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceController);
  });
});

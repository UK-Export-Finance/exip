const {
  get,
  post,
} = require('../test-mocks/mock-router');
const { ROUTES } = require('../constants');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');
const buyerBasedController = require('../controllers/buyer-based');
const triedToObtainCoverController = require('../controllers/tried-to-obtain-cover');
const ukContentPercentageController = require('../controllers/uk-content-pecentage');
const tellUsAboutYourDealController = require('../controllers/tell-us-about-your-deal');
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
    expect(get).toHaveBeenCalledTimes(15);
    expect(post).toHaveBeenCalledTimes(12);

    expect(get).toHaveBeenCalledWith(ROUTES.BEFORE_YOU_START, beforeYouStartController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.BEFORE_YOU_START, beforeYouStartController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.COMPANY_BASED, companyBasedController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.COMPANY_BASED, companyBasedController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.COMPANY_BASED_CHANGE, companyBasedController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.COMPANY_BASED_CHANGE, companyBasedController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.BUYER_BASED, buyerBasedController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.BUYER_BASED, buyerBasedController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.BUYER_BASED_CHANGE, buyerBasedController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.BUYER_BASED_CHANGE, buyerBasedController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.TRIED_TO_OBTAIN_COVER, triedToObtainCoverController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.TRIED_TO_OBTAIN_COVER, triedToObtainCoverController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE, triedToObtainCoverController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE, triedToObtainCoverController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.UK_CONTENT_PERCENTAGE, ukContentPercentageController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.UK_CONTENT_PERCENTAGE, ukContentPercentageController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.UK_CONTENT_PERCENTAGE_CHANGE, ukContentPercentageController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.UK_CONTENT_PERCENTAGE_CHANGE, ukContentPercentageController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_DEAL, tellUsAboutYourDealController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_DEAL, tellUsAboutYourDealController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE, tellUsAboutYourDealController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE, tellUsAboutYourDealController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS, checkYourAnswersController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS, checkYourAnswersController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.CANNOT_OBTAIN_COVER, cannotObtainCoverController);

    expect(get).toHaveBeenCalledWith(ROUTES.YOUR_QUOTE, yourQuoteController);

    expect(get).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceController);
  });
});

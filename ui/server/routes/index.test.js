const {
  get,
  post,
} = require('../test-mocks/mock-router');
const { ROUTES } = require('../constants');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');
const companyBasedUnavailableController = require('../controllers/company-based-unavailable');
const buyerBasedController = require('../controllers/buyer-based');
const buyerBasedUnavailableController = require('../controllers/buyer-based-unavailable');
const triedToObtainCoverController = require('../controllers/tried-to-obtain-cover');
const problemWithServiceController = require('../controllers/problem-with-service');

describe('routes/index', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(7);
    expect(post).toHaveBeenCalledTimes(3);

    expect(get).toHaveBeenCalledWith(ROUTES.BEFORE_YOU_START, beforeYouStartController);

    expect(get).toHaveBeenCalledWith(ROUTES.COMPANY_BASED, companyBasedController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.COMPANY_BASED, companyBasedController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.COMPANY_BASED_UNAVAILABLE, companyBasedUnavailableController);

    expect(get).toHaveBeenCalledWith(ROUTES.BUYER_BASED, buyerBasedController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.BUYER_BASED, buyerBasedController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.BUYER_BASED_UNAVAILABLE, buyerBasedUnavailableController);

    expect(get).toHaveBeenCalledWith(ROUTES.TRIED_TO_OBTAIN_COVER, triedToObtainCoverController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.TRIED_TO_OBTAIN_COVER, triedToObtainCoverController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceController);
  });
});

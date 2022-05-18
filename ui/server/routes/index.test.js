const {
  get,
  post,
} = require('../test-mocks/mock-router');
const CONSTANTS = require('../constants');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');
const companyBasedUnavailableController = require('../controllers/company-based-unavailable');
const buyerBasedController = require('../controllers/buyer-based');
const buyerBasedUnavailableController = require('../controllers/buyer-based-unavailable');

describe('routes/index', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(5);
    expect(post).toHaveBeenCalledTimes(2);

    expect(get).toHaveBeenCalledWith(CONSTANTS.ROUTES.BEFORE_YOU_START, beforeYouStartController);

    expect(get).toHaveBeenCalledWith(CONSTANTS.ROUTES.COMPANY_BASED, companyBasedController.get);
    expect(post).toHaveBeenCalledWith(CONSTANTS.ROUTES.COMPANY_BASED, companyBasedController.post);
    expect(get).toHaveBeenCalledWith(CONSTANTS.ROUTES.COMPANY_BASED_UNAVAILABLE, companyBasedUnavailableController);

    expect(get).toHaveBeenCalledWith(CONSTANTS.ROUTES.BUYER_BASED, buyerBasedController.get);
    expect(post).toHaveBeenCalledWith(CONSTANTS.ROUTES.BUYER_BASED, buyerBasedController.post);
    expect(get).toHaveBeenCalledWith(CONSTANTS.ROUTES.BUYER_BASED_UNAVAILABLE, buyerBasedUnavailableController);
  });
});

const {
  get,
  post,
} = require('../test-mocks/mock-router');
const CONSTANTS = require('../constants');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');
const companyBasedUnavailableController = require('../controllers/company-based-unavailable');

describe('routes/index', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(3);
    expect(post).toHaveBeenCalledTimes(1);

    expect(get).toHaveBeenCalledWith(CONSTANTS.ROUTES.BEFORE_YOU_START, beforeYouStartController);

    expect(get).toHaveBeenCalledWith(CONSTANTS.ROUTES.COMPANY_BASED, companyBasedController.get);
    expect(post).toHaveBeenCalledWith(CONSTANTS.ROUTES.COMPANY_BASED, companyBasedController.post);

    expect(get).toHaveBeenCalledWith(CONSTANTS.ROUTES.COMPANY_BASED_UNAVAILABLE, companyBasedUnavailableController);
  });
});

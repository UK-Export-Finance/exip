const { get } = require('../test-mocks/mock-router');
const CONSTANTS = require('../constants');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');

describe('routes/index', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(2);

    expect(get).toHaveBeenCalledWith(CONSTANTS.ROUTES.BEFORE_YOU_START, beforeYouStartController);
    expect(get).toHaveBeenCalledWith(CONSTANTS.ROUTES.COMPANY_BASED, companyBasedController);
  });
});

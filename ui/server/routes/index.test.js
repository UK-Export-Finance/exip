const { get } = require('../test-mocks/mock-router');
const indexController = require('../controllers');

describe('routes/index', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith('/', indexController);
  });
});

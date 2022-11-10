import { get, post } from '../../test-mocks/mock-router';
import { ROUTES } from '../../constants';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';

describe('routes/insurance', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(17);
    expect(post).toHaveBeenCalledTimes(13);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.START, startGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.START, startPost);

    expect(get).toHaveBeenCalledWith(`${ROUTES.INSURANCE.ROOT}/:referenceNumber${ROUTES.INSURANCE.ALL_SECTIONS}`, allSectionsGet);
  });
});

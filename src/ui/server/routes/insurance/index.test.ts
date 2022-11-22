import { get, post } from '../../test-mocks/mock-router';
import { INSURANCE_ROUTES, ROOT } from '../../constants/routes/insurance';
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

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.START, startGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.START, startPost);

    expect(get).toHaveBeenCalledWith(`${ROOT}/:referenceNumber${INSURANCE_ROUTES.ALL_SECTIONS}`, allSectionsGet);
  });
});

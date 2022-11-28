import { get, post } from '../../test-mocks/mock-router';
import { ROUTES } from '../../constants';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';
import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../controllers/insurance/policy-and-export/type-of-policy';

describe('routes/insurance', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(18);
    expect(post).toHaveBeenCalledTimes(14);

    expect(get).toHaveBeenCalledWith(ROUTES.INSURANCE.START, startGet);
    expect(post).toHaveBeenCalledWith(ROUTES.INSURANCE.START, startPost);

    expect(get).toHaveBeenCalledWith(`${ROUTES.INSURANCE.ROOT}/:referenceNumber${ROUTES.INSURANCE.ALL_SECTIONS}`, allSectionsGet);

    expect(get).toHaveBeenCalledWith(`${ROUTES.INSURANCE.ROOT}/:referenceNumber${ROUTES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyGet);

    expect(post).toHaveBeenCalledWith(`${ROUTES.INSURANCE.ROOT}/:referenceNumber${ROUTES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyPost);
  });
});

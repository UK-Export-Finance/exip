import { get, post } from '../../test-mocks/mock-router';
import { ROUTES } from '../../constants';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';
import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../controllers/insurance/policy-and-export/type-of-policy';
import { post as typeOfPolicySaveAndBackPost } from '../../controllers/insurance/policy-and-export/type-of-policy/save-and-back';

const { INSURANCE } = ROUTES;

describe('routes/insurance', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(18);
    expect(post).toHaveBeenCalledTimes(15);

    expect(get).toHaveBeenCalledWith(INSURANCE.START, startGet);
    expect(post).toHaveBeenCalledWith(INSURANCE.START, startPost);

    expect(get).toHaveBeenCalledWith(`${INSURANCE.INSURANCE_ROOT}/:referenceNumber${INSURANCE.ALL_SECTIONS}`, allSectionsGet);

    expect(get).toHaveBeenCalledWith(`${INSURANCE.INSURANCE_ROOT}/:referenceNumber${INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyGet);

    expect(post).toHaveBeenCalledWith(`${INSURANCE.INSURANCE_ROOT}/:referenceNumber${INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyPost);
    expect(post).toHaveBeenCalledWith(
      `${INSURANCE.INSURANCE_ROOT}/:referenceNumber${INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY_SAVE_AND_BACK}`,
      typeOfPolicySaveAndBackPost,
    );
  });
});

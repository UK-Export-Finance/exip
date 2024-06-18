import { get, post } from '../../../../test-mocks/mock-router';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../../../controllers/insurance/policy/type-of-policy';
import { post as typeOfPolicySaveAndBackPost } from '../../../../controllers/insurance/policy/type-of-policy/save-and-back';

const { TYPE_OF_POLICY, TYPE_OF_POLICY_SAVE_AND_BACK, TYPE_OF_POLICY_CHANGE, TYPE_OF_POLICY_CHECK_AND_CHANGE } = POLICY;

describe('routes/insurance/policy/type-of-policy', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(3);
    expect(post).toHaveBeenCalledTimes(4);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${TYPE_OF_POLICY}`, typeOfPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${TYPE_OF_POLICY}`, typeOfPolicyPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${TYPE_OF_POLICY_SAVE_AND_BACK}`, typeOfPolicySaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${TYPE_OF_POLICY_CHANGE}`, typeOfPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${TYPE_OF_POLICY_CHANGE}`, typeOfPolicyPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${TYPE_OF_POLICY_CHECK_AND_CHANGE}`, typeOfPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${TYPE_OF_POLICY_CHECK_AND_CHANGE}`, typeOfPolicyPost);
  });
});

import { get, post } from '../../../../test-mocks/mock-router';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as nameOnPolicyGet, post as nameOnPolicyPost } from '../../../../controllers/insurance/policy/name-on-policy';
import { post as nameOnPolicySaveAndBackPost } from '../../../../controllers/insurance/policy/name-on-policy/save-and-back';
import { get as differentNameOnPolicyGet, post as differentNameOnPolicyPost } from '../../../../controllers/insurance/policy/different-name-on-policy';
import { post as differentNameOnPolicySaveAndBackPost } from '../../../../controllers/insurance/policy/different-name-on-policy/save-and-back';

const {
  NAME_ON_POLICY,
  NAME_ON_POLICY_SAVE_AND_BACK,
  NAME_ON_POLICY_CHANGE,
  NAME_ON_POLICY_CHECK_AND_CHANGE,
  DIFFERENT_NAME_ON_POLICY,
  DIFFERENT_NAME_ON_POLICY_SAVE_AND_BACK,
  DIFFERENT_NAME_ON_POLICY_CHANGE,
  DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE,
} = POLICY;

describe('routes/insurance/policy/name-on-policy', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(6);
    expect(post).toHaveBeenCalledTimes(8);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${NAME_ON_POLICY}`, nameOnPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${NAME_ON_POLICY}`, nameOnPolicyPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${NAME_ON_POLICY_SAVE_AND_BACK}`, nameOnPolicySaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${NAME_ON_POLICY_CHANGE}`, nameOnPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${NAME_ON_POLICY_CHANGE}`, nameOnPolicyPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${NAME_ON_POLICY_CHECK_AND_CHANGE}`, nameOnPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${NAME_ON_POLICY_CHECK_AND_CHANGE}`, nameOnPolicyPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY}`, differentNameOnPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY}`, differentNameOnPolicyPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY_SAVE_AND_BACK}`, differentNameOnPolicySaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY_CHANGE}`, differentNameOnPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY_CHANGE}`, differentNameOnPolicyPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE}`, differentNameOnPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE}`, differentNameOnPolicyPost);
  });
});

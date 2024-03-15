import { get, post } from '../../../../test-mocks/mock-router';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as singleContractPolicyGet, post as singleContractPolicyPost } from '../../../../controllers/insurance/policy/single-contract-policy';
import { post as singleContractPolicySaveAndBackPost } from '../../../../controllers/insurance/policy/single-contract-policy/save-and-back';
import {
  get as singleContractPolicyContractValueGet,
  post as singleContractPolicyContractValuePost,
} from '../../../../controllers/insurance/policy/single-contract-policy/total-contract-value';
import { post as contractValueSaveAndBackPost } from '../../../../controllers/insurance/policy/single-contract-policy/total-contract-value/save-and-back';

const {
  SINGLE_CONTRACT_POLICY,
  SINGLE_CONTRACT_POLICY_SAVE_AND_BACK,
  SINGLE_CONTRACT_POLICY_CHANGE,
  SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
  SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE,
  SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_SAVE_AND_BACK,
  SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE,
  SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE,
} = POLICY;

describe('routes/insurance/policy/single-contract-policy', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(6);
    expect(post).toHaveBeenCalledTimes(8);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${SINGLE_CONTRACT_POLICY}`, singleContractPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${SINGLE_CONTRACT_POLICY}`, singleContractPolicyPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${SINGLE_CONTRACT_POLICY_SAVE_AND_BACK}`, singleContractPolicySaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${SINGLE_CONTRACT_POLICY_CHANGE}`, singleContractPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${SINGLE_CONTRACT_POLICY_CHANGE}`, singleContractPolicyPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, singleContractPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, singleContractPolicyPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`, singleContractPolicyContractValueGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`, singleContractPolicyContractValuePost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_SAVE_AND_BACK}`, contractValueSaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}`, singleContractPolicyContractValueGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}`, singleContractPolicyContractValuePost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE}`, singleContractPolicyContractValueGet);
    expect(post).toHaveBeenCalledWith(
      `/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE}`,
      singleContractPolicyContractValuePost,
    );
  });
});

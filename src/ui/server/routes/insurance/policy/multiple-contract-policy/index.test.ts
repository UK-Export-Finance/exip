import { get, post } from '../../../../test-mocks/mock-router';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as multipleContractPolicyGet, post as multipleContractPolicyPost } from '../../../../controllers/insurance/policy/multiple-contract-policy';
import {
  get as multipleContractPolicyExportValueGet,
  post as multipleContractPolicyExportValuePost,
} from '../../../../controllers/insurance/policy/multiple-contract-policy/export-value';
import { post as multipleContractPolicyExportValueSaveAndBackPost } from '../../../../controllers/insurance/policy/multiple-contract-policy/export-value/save-and-back';
import { post as multipleContractPolicySaveAndBackPost } from '../../../../controllers/insurance/policy/multiple-contract-policy/save-and-back';

const {
  MULTIPLE_CONTRACT_POLICY,
  MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK,
  MULTIPLE_CONTRACT_POLICY_CHANGE,
  MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
  MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE,
  MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_SAVE_AND_BACK,
  MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE,
  MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE,
} = POLICY;

describe('routes/insurance/policy/multiple-contract-policy', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(6);
    expect(post).toHaveBeenCalledTimes(8);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`, multipleContractPolicySaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_CHANGE}`, multipleContractPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_CHANGE}`, multipleContractPolicyPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, multipleContractPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, multipleContractPolicyPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`, multipleContractPolicyExportValueGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`, multipleContractPolicyExportValuePost);
    expect(post).toHaveBeenCalledWith(
      `/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_SAVE_AND_BACK}`,
      multipleContractPolicyExportValueSaveAndBackPost,
    );
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE}`, multipleContractPolicyExportValueGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE}`, multipleContractPolicyExportValuePost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE}`, multipleContractPolicyExportValueGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE}`, multipleContractPolicyExportValuePost);
  });
});

import { get, post } from '../../../test-mocks/mock-router';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as policyRootGet } from '../../../controllers/insurance/policy';
import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../../controllers/insurance/policy/type-of-policy';
import { post as typeOfPolicySaveAndBackPost } from '../../../controllers/insurance/policy/type-of-policy/save-and-back';
import { get as singleContractPolicyGet, post as singleContractPolicyPost } from '../../../controllers/insurance/policy/single-contract-policy';
import { post as singleContractPolicySaveAndBackPost } from '../../../controllers/insurance/policy/single-contract-policy/save-and-back';
import { get as multipleContractPolicyGet, post as multipleContractPolicyPost } from '../../../controllers/insurance/policy/multiple-contract-policy';
import { post as multipleContractPolicySaveAndBackPost } from '../../../controllers/insurance/policy/multiple-contract-policy/save-and-back';
import {
  get as multipleContractPolicyExportValueGet,
  post as multipleContractPolicyExportValuePost,
} from '../../../controllers/insurance/policy/multiple-contract-policy/export-value';
import { post as multipleContractPolicyExportValueSaveAndBackPost } from '../../../controllers/insurance/policy/multiple-contract-policy/export-value/save-and-back';
import { get as nameOnPolicyGet, post as nameOnPolicyPost } from '../../../controllers/insurance/policy/name-on-policy';
import { post as nameOnPolicySaveAndBackPost } from '../../../controllers/insurance/policy/name-on-policy/save-and-back';
import { get as differentNameOnPolicyGet, post as differentNameOnPolicyPost } from '../../../controllers/insurance/policy/different-name-on-policy';
import { get as preCreditPeriodGet } from '../../../controllers/insurance/policy/pre-credit-period';
import { post as differentNameOnPolicySaveAndBackPost } from '../../../controllers/insurance/policy/different-name-on-policy/save-and-back';
import { get as getBroker, post as postBroker } from '../../../controllers/insurance/policy/broker';
import { post as postBrokerSaveAndBack } from '../../../controllers/insurance/policy/broker/save-and-back';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../controllers/insurance/policy/check-your-answers';

describe('routes/insurance/policy', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(22);
    expect(post).toHaveBeenCalledTimes(27);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.ROOT}`, policyRootGet);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.TYPE_OF_POLICY}`, typeOfPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.TYPE_OF_POLICY}`, typeOfPolicyPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.TYPE_OF_POLICY_SAVE_AND_BACK}`, typeOfPolicySaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.TYPE_OF_POLICY_CHANGE}`, typeOfPolicyGet);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.TYPE_OF_POLICY_CHECK_AND_CHANGE}`, typeOfPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.TYPE_OF_POLICY_CHECK_AND_CHANGE}`, typeOfPolicyPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY}`, singleContractPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY}`, singleContractPolicyPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_SAVE_AND_BACK}`, singleContractPolicySaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_CHANGE}`, singleContractPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_CHANGE}`, singleContractPolicyPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, singleContractPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, singleContractPolicyPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyPost);
    expect(post).toHaveBeenCalledWith(
      `/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
      multipleContractPolicySaveAndBackPost,
    );
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_CHANGE}`, multipleContractPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_CHANGE}`, multipleContractPolicyPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, multipleContractPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, multipleContractPolicyPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`, multipleContractPolicyExportValueGet);
    expect(post).toHaveBeenCalledWith(
      `/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`,
      multipleContractPolicyExportValuePost,
    );
    expect(post).toHaveBeenCalledWith(
      `/:referenceNumber${INSURANCE_ROUTES.POLICY.MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_SAVE_AND_BACK}`,
      multipleContractPolicyExportValueSaveAndBackPost,
    );

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY}`, nameOnPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY}`, nameOnPolicyPost);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY_SAVE_AND_BACK}`, nameOnPolicySaveAndBackPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY_CHANGE}`, nameOnPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY_CHANGE}`, nameOnPolicyPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY_CHECK_AND_CHANGE}`, nameOnPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.NAME_ON_POLICY_CHECK_AND_CHANGE}`, nameOnPolicyPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY}`, differentNameOnPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY}`, differentNameOnPolicyPost);
    expect(post).toHaveBeenCalledWith(
      `/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY_SAVE_AND_BACK}`,
      differentNameOnPolicySaveAndBackPost,
    );
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY_CHANGE}`, differentNameOnPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY_CHANGE}`, differentNameOnPolicyPost);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE}`, differentNameOnPolicyGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE}`, differentNameOnPolicyPost);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.PRE_CREDIT_PERIOD}`, preCreditPeriodGet);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_ROOT}`, getBroker);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_ROOT}`, postBroker);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_SAVE_AND_BACK}`, postBrokerSaveAndBack);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_CHANGE}`, getBroker);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_CHANGE}`, postBroker);
    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_CHECK_AND_CHANGE}`, getBroker);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.BROKER_CHECK_AND_CHANGE}`, postBroker);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${INSURANCE_ROUTES.POLICY.CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);
  });
});

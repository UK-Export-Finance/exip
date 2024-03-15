import express from 'express';
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

// @ts-ignore
const router = express.Router();

router.get(`/:referenceNumber${SINGLE_CONTRACT_POLICY}`, singleContractPolicyGet);
router.post(`/:referenceNumber${SINGLE_CONTRACT_POLICY}`, singleContractPolicyPost);
router.post(`/:referenceNumber${SINGLE_CONTRACT_POLICY_SAVE_AND_BACK}`, singleContractPolicySaveAndBackPost);
router.get(`/:referenceNumber${SINGLE_CONTRACT_POLICY_CHANGE}`, singleContractPolicyGet);
router.post(`/:referenceNumber${SINGLE_CONTRACT_POLICY_CHANGE}`, singleContractPolicyPost);
router.get(`/:referenceNumber${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, singleContractPolicyGet);
router.post(`/:referenceNumber${SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, singleContractPolicyPost);

router.get(`/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`, singleContractPolicyContractValueGet);
router.post(`/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE}`, singleContractPolicyContractValuePost);

router.post(`/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_SAVE_AND_BACK}`, contractValueSaveAndBackPost);

router.get(`/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}`, singleContractPolicyContractValueGet);
router.post(`/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHANGE}`, singleContractPolicyContractValuePost);

router.get(`/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE}`, singleContractPolicyContractValueGet);
router.post(`/:referenceNumber${SINGLE_CONTRACT_POLICY_TOTAL_CONTRACT_VALUE_CHECK_AND_CHANGE}`, singleContractPolicyContractValuePost);

export default router;

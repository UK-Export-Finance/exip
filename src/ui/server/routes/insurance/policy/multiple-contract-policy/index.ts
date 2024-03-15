import express from 'express';
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

// @ts-ignore
const router = express.Router();

router.get(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyGet);
router.post(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY}`, multipleContractPolicyPost);
router.post(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_SAVE_AND_BACK}`, multipleContractPolicySaveAndBackPost);
router.get(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_CHANGE}`, multipleContractPolicyGet);
router.post(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_CHANGE}`, multipleContractPolicyPost);
router.get(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, multipleContractPolicyGet);
router.post(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE}`, multipleContractPolicyPost);

router.get(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`, multipleContractPolicyExportValueGet);
router.post(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE}`, multipleContractPolicyExportValuePost);
router.post(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_SAVE_AND_BACK}`, multipleContractPolicyExportValueSaveAndBackPost);
router.get(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE}`, multipleContractPolicyExportValueGet);
router.post(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHANGE}`, multipleContractPolicyExportValuePost);
router.get(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE}`, multipleContractPolicyExportValueGet);
router.post(`/:referenceNumber${MULTIPLE_CONTRACT_POLICY_EXPORT_VALUE_CHECK_AND_CHANGE}`, multipleContractPolicyExportValuePost);

export default router;

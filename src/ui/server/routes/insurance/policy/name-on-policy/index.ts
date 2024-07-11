import express from 'express';
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

// @ts-ignore
const router = express.Router();

router.get(`/:referenceNumber${NAME_ON_POLICY}`, nameOnPolicyGet);
router.post(`/:referenceNumber${NAME_ON_POLICY}`, nameOnPolicyPost);
router.post(`/:referenceNumber${NAME_ON_POLICY_SAVE_AND_BACK}`, nameOnPolicySaveAndBackPost);

router.get(`/:referenceNumber${NAME_ON_POLICY_CHANGE}`, nameOnPolicyGet);
router.post(`/:referenceNumber${NAME_ON_POLICY_CHANGE}`, nameOnPolicyPost);
router.get(`/:referenceNumber${NAME_ON_POLICY_CHECK_AND_CHANGE}`, nameOnPolicyGet);
router.post(`/:referenceNumber${NAME_ON_POLICY_CHECK_AND_CHANGE}`, nameOnPolicyPost);

router.get(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY}`, differentNameOnPolicyGet);
router.post(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY}`, differentNameOnPolicyPost);
router.post(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY_SAVE_AND_BACK}`, differentNameOnPolicySaveAndBackPost);

router.get(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY_CHANGE}`, differentNameOnPolicyGet);
router.post(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY_CHANGE}`, differentNameOnPolicyPost);
router.get(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE}`, differentNameOnPolicyGet);
router.post(`/:referenceNumber${DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE}`, differentNameOnPolicyPost);

export default router;

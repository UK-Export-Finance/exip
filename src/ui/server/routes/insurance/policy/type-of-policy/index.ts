import express from 'express';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../../../controllers/insurance/policy/type-of-policy';
import { post as typeOfPolicySaveAndBackPost } from '../../../../controllers/insurance/policy/type-of-policy/save-and-back';

const { TYPE_OF_POLICY, TYPE_OF_POLICY_SAVE_AND_BACK, TYPE_OF_POLICY_CHANGE, TYPE_OF_POLICY_CHECK_AND_CHANGE } = POLICY;

// @ts-ignore
const router = express.Router();

router.get(`/:referenceNumber${TYPE_OF_POLICY}`, typeOfPolicyGet);
router.post(`/:referenceNumber${TYPE_OF_POLICY}`, typeOfPolicyPost);
router.post(`/:referenceNumber${TYPE_OF_POLICY_SAVE_AND_BACK}`, typeOfPolicySaveAndBackPost);
router.get(`/:referenceNumber${TYPE_OF_POLICY_CHANGE}`, typeOfPolicyGet);
router.post(`/:referenceNumber${TYPE_OF_POLICY_CHANGE}`, typeOfPolicyPost);
router.get(`/:referenceNumber${TYPE_OF_POLICY_CHECK_AND_CHANGE}`, typeOfPolicyGet);
router.post(`/:referenceNumber${TYPE_OF_POLICY_CHECK_AND_CHANGE}`, typeOfPolicyPost);

export default router;

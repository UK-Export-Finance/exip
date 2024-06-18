import express from 'express';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as preCreditPeriodGet, post as preCreditPeriodPost } from '../../../../controllers/insurance/policy/pre-credit-period';
import { post as preCreditPeriodSaveAndBackPost } from '../../../../controllers/insurance/policy/pre-credit-period/save-and-back';

const { PRE_CREDIT_PERIOD, PRE_CREDIT_PERIOD_SAVE_AND_BACK, PRE_CREDIT_PERIOD_CHANGE, PRE_CREDIT_PERIOD_CHECK_AND_CHANGE } = POLICY;

// @ts-ignore
const router = express.Router();

router.get(`/:referenceNumber${PRE_CREDIT_PERIOD}`, preCreditPeriodGet);
router.post(`/:referenceNumber${PRE_CREDIT_PERIOD}`, preCreditPeriodPost);
router.post(`/:referenceNumber${PRE_CREDIT_PERIOD_SAVE_AND_BACK}`, preCreditPeriodSaveAndBackPost);

router.get(`/:referenceNumber${PRE_CREDIT_PERIOD_CHANGE}`, preCreditPeriodGet);
router.post(`/:referenceNumber${PRE_CREDIT_PERIOD_CHANGE}`, preCreditPeriodPost);
router.get(`/:referenceNumber${PRE_CREDIT_PERIOD_CHECK_AND_CHANGE}`, preCreditPeriodGet);
router.post(`/:referenceNumber${PRE_CREDIT_PERIOD_CHECK_AND_CHANGE}`, preCreditPeriodPost);

export default router;

import express from 'express';
import { POLICY } from '../../../../constants/routes/insurance/policy';
import { get as checkYourAnswersGet, post as checkYourAnswersPost } from '../../../../controllers/insurance/policy/check-your-answers';

const { CHECK_YOUR_ANSWERS } = POLICY;

// @ts-ignore
const router = express.Router();

router.get(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersGet);
router.post(`/:referenceNumber${CHECK_YOUR_ANSWERS}`, checkYourAnswersPost);

export default router;

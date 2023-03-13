import express from 'express';
import { CHECK_YOUR_ANSWERS } from '../../../constants/routes/insurance/check-your-answers';
import { get as getEligibilityCheckYourAnswers, post as postEligibilityCheckYourAnswers } from '../../../controllers/insurance/check-your-answers/eligibility';

// @ts-ignore
const insuranceCheckYourAnswersRouter = express.Router();

insuranceCheckYourAnswersRouter.get(`/:referenceNumber${CHECK_YOUR_ANSWERS.ELIGIBILITY}`, getEligibilityCheckYourAnswers);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.ELIGIBILITY}`, postEligibilityCheckYourAnswers);

export default insuranceCheckYourAnswersRouter;

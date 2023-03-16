import express from 'express';
import { CHECK_YOUR_ANSWERS } from '../../../constants/routes/insurance/check-your-answers';
import { get as getcheckYourAnswersEligibility, post as postcheckYourAnswersEligibility } from '../../../controllers/insurance/check-your-answers/eligibility';
import {
  get as getcheckYourAnswersPolicyAndExports,
  post as postcheckYourAnswersPolicyAndExports,
} from '../../../controllers/insurance/check-your-answers/policy-and-exports';

// @ts-ignore
const insuranceCheckYourAnswersRouter = express.Router();

insuranceCheckYourAnswersRouter.get(`/:referenceNumber${CHECK_YOUR_ANSWERS.ELIGIBILITY}`, getcheckYourAnswersEligibility);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.ELIGIBILITY}`, postcheckYourAnswersEligibility);

insuranceCheckYourAnswersRouter.get(`/:referenceNumber${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, getcheckYourAnswersPolicyAndExports);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, postcheckYourAnswersPolicyAndExports);

export default insuranceCheckYourAnswersRouter;

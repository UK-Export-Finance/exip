import express from 'express';
import { CHECK_YOUR_ANSWERS } from '../../../constants/routes/insurance/check-your-answers';
import { get as getCheckYourAnswersEligibility, post as postCheckYourAnswersEligibility } from '../../../controllers/insurance/check-your-answers/eligibility';
import {
  get as getCheckYourAnswersPolicyAndExports,
  post as postCheckYourAnswersPolicyAndExports,
} from '../../../controllers/insurance/check-your-answers/policy-and-exports';
import {
  get as getCheckYourAnswersYourBusiness,
  post as postCheckYourAnswersYourBusiness,
} from '../../../controllers/insurance/check-your-answers/your-business';
import { get as getCheckYourAnswersYourBuyer, post as postCheckYourAnswersYourBuyer } from '../../../controllers/insurance/check-your-answers/your-buyer';
import { post as saveAndBack } from '../../../controllers/insurance/check-your-answers/save-and-back';

// @ts-ignore
const insuranceCheckYourAnswersRouter = express.Router();

insuranceCheckYourAnswersRouter.get(`/:referenceNumber${CHECK_YOUR_ANSWERS.ELIGIBILITY}`, getCheckYourAnswersEligibility);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.ELIGIBILITY}`, postCheckYourAnswersEligibility);

insuranceCheckYourAnswersRouter.get(`/:referenceNumber${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, getCheckYourAnswersPolicyAndExports);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, postCheckYourAnswersPolicyAndExports);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY_SAVE_AND_BACK}`, saveAndBack);

insuranceCheckYourAnswersRouter.get(`/:referenceNumber${CHECK_YOUR_ANSWERS.YOUR_BUSINESS}`, getCheckYourAnswersYourBusiness);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.YOUR_BUSINESS}`, postCheckYourAnswersYourBusiness);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.YOUR_BUSINESS_SAVE_AND_BACK}`, saveAndBack);

insuranceCheckYourAnswersRouter.get(`/:referenceNumber${CHECK_YOUR_ANSWERS.YOUR_BUYER}`, getCheckYourAnswersYourBuyer);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.YOUR_BUYER}`, postCheckYourAnswersYourBuyer);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.YOUR_BUYER_SAVE_AND_BACK}`, saveAndBack);

export default insuranceCheckYourAnswersRouter;

import express from 'express';
import { CHECK_YOUR_ANSWERS } from '../../../constants/routes/insurance/check-your-answers';
import {
  get as getCheckYourAnswersYourBusiness,
  post as postCheckYourAnswersYourBusiness,
} from '../../../controllers/insurance/check-your-answers/your-business';
import { get as getCheckYourAnswersYourBuyer, post as postCheckYourAnswersYourBuyer } from '../../../controllers/insurance/check-your-answers/your-buyer';
import { get as getCheckYourAnswersPolicy, post as postCheckYourAnswersPolicy } from '../../../controllers/insurance/check-your-answers/policy';
import {
  get as getCheckYourAnswersExportContract,
  post as postCheckYourAnswersExportContract,
} from '../../../controllers/insurance/check-your-answers/export-contract';
import { post as saveAndBack } from '../../../controllers/insurance/check-your-answers/save-and-back';

// @ts-ignore
const insuranceCheckYourAnswersRouter = express.Router();

insuranceCheckYourAnswersRouter.get(`/:referenceNumber${CHECK_YOUR_ANSWERS.YOUR_BUSINESS}`, getCheckYourAnswersYourBusiness);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.YOUR_BUSINESS}`, postCheckYourAnswersYourBusiness);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.YOUR_BUSINESS_SAVE_AND_BACK}`, saveAndBack);

insuranceCheckYourAnswersRouter.get(`/:referenceNumber${CHECK_YOUR_ANSWERS.YOUR_BUYER}`, getCheckYourAnswersYourBuyer);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.YOUR_BUYER}`, postCheckYourAnswersYourBuyer);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.YOUR_BUYER_SAVE_AND_BACK}`, saveAndBack);

insuranceCheckYourAnswersRouter.get(`/:referenceNumber${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, getCheckYourAnswersPolicy);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY}`, postCheckYourAnswersPolicy);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.TYPE_OF_POLICY_SAVE_AND_BACK}`, saveAndBack);

insuranceCheckYourAnswersRouter.get(`/:referenceNumber${CHECK_YOUR_ANSWERS.EXPORT_CONTRACT}`, getCheckYourAnswersExportContract);
insuranceCheckYourAnswersRouter.post(`/:referenceNumber${CHECK_YOUR_ANSWERS.EXPORT_CONTRACT}`, postCheckYourAnswersExportContract);

export default insuranceCheckYourAnswersRouter;

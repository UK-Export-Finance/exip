import express from 'express';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as policyRootGet } from '../../../controllers/insurance/policy';
import typeofPolicyRouter from './type-of-policy';
import singleContractPolicyRouter from './single-contract-policy';
import multipleContractPolicyRouter from './multiple-contract-policy';
import nameOnPolicyRouter from './name-on-policy';
import anotherCompanyRouter from './another-company';
import brokerRouter from './broker';
import preCreditPeriodRouter from './pre-credit-period';
import lossPayeeRouter from './loss-payee';
import checkYourAnswersRouter from './check-your-answers';

const { POLICY } = INSURANCE_ROUTES;

// @ts-ignore
const router = express.Router();

router.get(`/:referenceNumber${POLICY.ROOT}`, policyRootGet);

router.use('/', typeofPolicyRouter);
router.use('/', singleContractPolicyRouter);
router.use('/', multipleContractPolicyRouter);
router.use('/', nameOnPolicyRouter);
router.use('/', anotherCompanyRouter);
router.use('/', brokerRouter);
router.use('/', preCreditPeriodRouter);
router.use('/', lossPayeeRouter);
router.use('/', checkYourAnswersRouter);

export default router;

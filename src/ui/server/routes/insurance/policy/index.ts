import express from 'express';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../../constants/routes/insurance';
import { get as policyRootGet } from '../../../controllers/insurance/policy';
import typeofPolicyRouter from './type-of-policy';
import singleContractPolicyRouter from './single-contract-policy';
import multipleContractPolicyRouter from './multiple-contract-policy';
import nameOnPolicyRouter from './name-on-policy';
import anotherCompanyRouter from './another-company';
import brokerRouter from './broker';
import preCreditPeriodRouter from './pre-credit-period';
import lossPayeeRouter from './loss-payee';
import checkYourAnsweresRouter from './check-your-answers';

const { POLICY } = INSURANCE_ROUTES;

// @ts-ignore
const router = express.Router();

router.get(`/:referenceNumber${POLICY.ROOT}`, policyRootGet);

router.use(INSURANCE_ROOT, typeofPolicyRouter);
router.use(INSURANCE_ROOT, singleContractPolicyRouter);
router.use(INSURANCE_ROOT, multipleContractPolicyRouter);
router.use(INSURANCE_ROOT, nameOnPolicyRouter);
router.use(INSURANCE_ROOT, anotherCompanyRouter);
router.use(INSURANCE_ROOT, brokerRouter);
router.use(INSURANCE_ROOT, preCreditPeriodRouter);
router.use(INSURANCE_ROOT, lossPayeeRouter);
router.use(INSURANCE_ROOT, checkYourAnsweresRouter);

export default router;

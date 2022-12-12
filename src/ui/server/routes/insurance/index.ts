import express from 'express';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../constants/routes/insurance';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';
import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../controllers/insurance/policy-and-export/type-of-policy';
import { get as singleContractPolicyGet } from '../../controllers/insurance/policy-and-export/single-contract-policy';
import insuranceEligibilityRoutes from './eligibility';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

insuranceRouter.get(INSURANCE_ROUTES.START, startGet);
insuranceRouter.post(INSURANCE_ROUTES.START, startPost);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.ALL_SECTIONS}`, allSectionsGet);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.ALL_SECTIONS}`, allSectionsGet);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyGet);
insuranceRouter.post(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyPost);

insuranceRouter.get(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`, singleContractPolicyGet);

insuranceRouter.use('/', insuranceEligibilityRoutes);

export default insuranceRouter;

import express from 'express';
import { ROUTES } from '../../constants';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';
import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../controllers/insurance/policy-and-export/type-of-policy';
import { post as typeOfPolicySaveAndBackPost } from '../../controllers/insurance/policy-and-export/type-of-policy/save-and-back';
import insuranceEligibilityRoutes from './eligibility';

const { INSURANCE } = ROUTES;

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

insuranceRouter.get(INSURANCE.START, startGet);
insuranceRouter.post(INSURANCE.START, startPost);

insuranceRouter.get(`${INSURANCE.INSURANCE_ROOT}/:referenceNumber${INSURANCE.ALL_SECTIONS}`, allSectionsGet);

insuranceRouter.get(`${INSURANCE.INSURANCE_ROOT}/:referenceNumber${INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyGet);
insuranceRouter.post(`${INSURANCE.INSURANCE_ROOT}/:referenceNumber${INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyPost);

insuranceRouter.post(`${INSURANCE.INSURANCE_ROOT}/:referenceNumber${INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY_SAVE_AND_BACK}`, typeOfPolicySaveAndBackPost);

insuranceRouter.use('/', insuranceEligibilityRoutes);

export default insuranceRouter;

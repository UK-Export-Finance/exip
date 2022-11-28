import express from 'express';
import { ROUTES } from '../../constants';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';
import { get as typeOfPolicyGet, post as typeOfPolicyPost } from '../../controllers/insurance/policy-and-export/type-of-policy';
import insuranceEligibilityRoutes from './eligibility';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

insuranceRouter.get(ROUTES.INSURANCE.START, startGet);
insuranceRouter.post(ROUTES.INSURANCE.START, startPost);

insuranceRouter.get(`${ROUTES.INSURANCE.ROOT}/:referenceNumber${ROUTES.INSURANCE.ALL_SECTIONS}`, allSectionsGet);

insuranceRouter.get(`${ROUTES.INSURANCE.ROOT}/:referenceNumber${ROUTES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyGet);
insuranceRouter.post(`${ROUTES.INSURANCE.ROOT}/:referenceNumber${ROUTES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, typeOfPolicyPost);

insuranceRouter.use('/', insuranceEligibilityRoutes);

export default insuranceRouter;

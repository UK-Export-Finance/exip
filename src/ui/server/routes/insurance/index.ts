import express from 'express';
import { ROUTES } from '../../constants';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';
import insuranceEligibilityRoutes from './eligibility';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

insuranceRouter.get(ROUTES.INSURANCE.START, startGet);
insuranceRouter.post(ROUTES.INSURANCE.START, startPost);

insuranceRouter.get(`${ROUTES.INSURANCE.ROOT}/:referenceNumber${ROUTES.INSURANCE.ALL_SECTIONS}`, allSectionsGet);

insuranceRouter.use('/', insuranceEligibilityRoutes);

export default insuranceRouter;

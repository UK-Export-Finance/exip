import express from 'express';
import { INSURANCE_ROUTES, ROOT } from '../../constants/routes/insurance';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';
import insuranceEligibilityRoutes from './eligibility';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

insuranceRouter.get(INSURANCE_ROUTES.START, startGet);
insuranceRouter.post(INSURANCE_ROUTES.START, startPost);

insuranceRouter.get(`${ROOT}/:referenceNumber${INSURANCE_ROUTES.ALL_SECTIONS}`, allSectionsGet);

insuranceRouter.use('/', insuranceEligibilityRoutes);

export default insuranceRouter;

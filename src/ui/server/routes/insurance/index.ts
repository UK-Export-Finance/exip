import express from 'express';
import { ROUTES } from '../../constants';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import insuranceEligibilityRoutes from './eligibility';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

insuranceRouter.get(ROUTES.INSURANCE.START, startGet);
insuranceRouter.post(ROUTES.INSURANCE.START, startPost);

insuranceRouter.use('/', insuranceEligibilityRoutes);

export default insuranceRouter;

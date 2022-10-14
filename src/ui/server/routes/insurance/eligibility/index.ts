import express from 'express';
import { ROUTES } from '../../../constants';
import { get as checkIfEligibleGet, post as checkIfEligiblePost } from '../../../controllers/insurance/eligibility/check-if-eligible';

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const insuranceRouter = express.Router();
/* eslint-enable @typescript-eslint/ban-ts-comment */

insuranceRouter.get(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligibleGet);
insuranceRouter.post(ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE, checkIfEligiblePost);

export default insuranceRouter;

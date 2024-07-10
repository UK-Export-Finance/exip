import express from 'express';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import redirectGet from '../../controllers/redirects';

const { MVP_INSURANCE_ROOT } = INSURANCE_ROUTES;

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
const redirectRouter = express.Router();

redirectRouter.get(`/${MVP_INSURANCE_ROOT}/:referenceNumber/*`, redirectGet);
redirectRouter.get(`/${MVP_INSURANCE_ROOT}*`, redirectGet);

export default redirectRouter;

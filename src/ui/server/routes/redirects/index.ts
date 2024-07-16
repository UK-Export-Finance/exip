import express from 'express';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import startRedirectGet from '../../controllers/redirects/start';
import redirectGet from '../../controllers/redirects';

const { MVP_INSURANCE_ROOT, START_ROOT } = INSURANCE_ROUTES;

// @ts-ignore
const redirectRouter = express.Router();

redirectRouter.get(`${MVP_INSURANCE_ROOT}${START_ROOT}`, startRedirectGet);
redirectRouter.get(`${MVP_INSURANCE_ROOT}/:referenceNumber/*`, redirectGet);
redirectRouter.get(`${MVP_INSURANCE_ROOT}*`, redirectGet);

export default redirectRouter;

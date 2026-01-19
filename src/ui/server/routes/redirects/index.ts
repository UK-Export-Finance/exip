import express from 'express';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import redirectGet from '../../controllers/redirects';

const { MVP_INSURANCE_ROOT } = INSURANCE_ROUTES;

// @ts-ignore
const redirectRouter = express.Router();

redirectRouter.get(`${MVP_INSURANCE_ROOT}/:referenceNumber/{*splat}`, redirectGet);
redirectRouter.get(`${MVP_INSURANCE_ROOT}{*splat}`, redirectGet);

export default redirectRouter;

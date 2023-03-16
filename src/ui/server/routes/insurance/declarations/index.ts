import express from 'express';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as confidentialityGet, post as confidentialityPost } from '../../../controllers/insurance/declarations/confidentiality';
import { get as antiBriberyGet } from '../../../controllers/insurance/declarations/anti-bribery';
import { post as saveAndBackPost } from '../../../controllers/insurance/declarations/save-and-back';

// @ts-ignore
const insuranceDeclarationsRouter = express.Router();

insuranceDeclarationsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY}`, confidentialityGet);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY}`, confidentialityPost);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY_SAVE_AND_BACK}`, saveAndBackPost);

insuranceDeclarationsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.ROOT}`, antiBriberyGet);

export default insuranceDeclarationsRouter;

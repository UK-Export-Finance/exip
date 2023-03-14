import express from 'express';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as confidentialityGet, post as confidentialityPost } from '../../../controllers/insurance/declarations/confidentiality';
import { post as confidentialitySaveAndBackPost } from '../../../controllers/insurance/declarations/confidentiality/save-and-back';

// @ts-ignore
const insuranceDeclarationsRouter = express.Router();

insuranceDeclarationsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY}`, confidentialityGet);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY}`, confidentialityPost);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY_SAVE_AND_BACK}`, confidentialitySaveAndBackPost);

export default insuranceDeclarationsRouter;

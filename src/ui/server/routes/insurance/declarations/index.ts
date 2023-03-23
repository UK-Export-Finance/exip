import express from 'express';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as confidentialityGet, post as confidentialityPost } from '../../../controllers/insurance/declarations/confidentiality';
import { get as antiBriberyGet, post as antiBriberyPost } from '../../../controllers/insurance/declarations/anti-bribery';
import { get as codeOfConductGet, post as codeOfConductPost } from '../../../controllers/insurance/declarations/anti-bribery/code-of-conduct';
import {
  get as exportingWithCodeOfConductGet,
  post as exportingWithCodeOfConductPost,
} from '../../../controllers/insurance/declarations/anti-bribery/exporting-with-code-of-conduct';
import {
  get as confirmationAndAcknowledgementsGet,
  post as confirmationAndAcknowledgementsPost,
} from '../../../controllers/insurance/declarations/confirmation-and-acknowledgements';
import { get as howYourDataWillBeUsedGet, post as howYourDataWillBeUsedPost } from '../../../controllers/insurance/declarations/how-your-data-will-be-used';
import { post as saveAndBackPost } from '../../../controllers/insurance/declarations/save-and-back';

// @ts-ignore
const insuranceDeclarationsRouter = express.Router();

insuranceDeclarationsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY}`, confidentialityGet);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY}`, confidentialityPost);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIDENTIALITY_SAVE_AND_BACK}`, saveAndBackPost);

insuranceDeclarationsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.ROOT}`, antiBriberyGet);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.ROOT}`, antiBriberyPost);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.ROOT_SAVE_AND_BACK}`, saveAndBackPost);

insuranceDeclarationsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.CODE_OF_CONDUCT}`, codeOfConductGet);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.CODE_OF_CONDUCT}`, codeOfConductPost);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.CODE_OF_CONDUCT_SAVE_AND_BACK}`, saveAndBackPost);

insuranceDeclarationsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.EXPORTING_WITH_CODE_OF_CONDUCT}`, exportingWithCodeOfConductGet);

insuranceDeclarationsRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.EXPORTING_WITH_CODE_OF_CONDUCT}`,
  exportingWithCodeOfConductPost,
);

insuranceDeclarationsRouter.post(
  `/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.ANTI_BRIBERY.EXPORTING_WITH_CODE_OF_CONDUCT_SAVE_AND_BACK}`,
  saveAndBackPost,
);

insuranceDeclarationsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIRMATION_AND_ACKNOWLEDGEMENTS}`, confirmationAndAcknowledgementsGet);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIRMATION_AND_ACKNOWLEDGEMENTS}`, confirmationAndAcknowledgementsPost);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.CONFIRMATION_AND_ACKNOWLEDGEMENTS_SAVE_AND_BACK}`, saveAndBackPost);

insuranceDeclarationsRouter.get(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.HOW_YOUR_DATA_WILL_BE_USED}`, howYourDataWillBeUsedGet);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.HOW_YOUR_DATA_WILL_BE_USED}`, howYourDataWillBeUsedPost);
insuranceDeclarationsRouter.post(`/:referenceNumber${INSURANCE_ROUTES.DECLARATIONS.HOW_YOUR_DATA_WILL_BE_USED_SAVE_AND_BACK}`, saveAndBackPost);

export default insuranceDeclarationsRouter;

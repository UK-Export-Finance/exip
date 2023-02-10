import express from 'express';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as yourDetailsGet, post as yourDetailsPost } from '../../../controllers/insurance/account/create/your-details';
import { get as confirmEmailGet } from '../../../controllers/insurance/account/create/confirm-email';
import { get as signInGet, post as signInPost } from '../../../controllers/insurance/account/sign-in';

// @ts-ignore
const insuranceAccountRouter = express.Router();

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS, yourDetailsGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS, yourDetailsPost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.CONFIRM_EMAIL, confirmEmailGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ROOT, signInGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ROOT, signInPost);

export default insuranceAccountRouter;

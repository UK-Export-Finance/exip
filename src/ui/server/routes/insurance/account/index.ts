import express from 'express';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as yourDetailsGet, post as yourDetailsPost } from '../../../controllers/insurance/account/create/your-details';
import { get as confirmEmailGet } from '../../../controllers/insurance/account/create/confirm-email';
import { get as confirmEmailResentGet } from '../../../controllers/insurance/account/create/confirm-email-resent';
import { get as verifyEmailGet } from '../../../controllers/insurance/account/create/verify-email';
import { get as verifyEmailLinkExpiredGet } from '../../../controllers/insurance/account/create/verify-email-link-expired';
import { get as signInGet, post as signInPost } from '../../../controllers/insurance/account/sign-in';
import { get as enterCodeGet, post as enterCodePost } from '../../../controllers/insurance/account/sign-in/enter-code';
import { get as requestNewCodeGet, post as requestNewCodePost } from '../../../controllers/insurance/account/sign-in/request-new-code';
import { get as signedOutGet } from '../../../controllers/insurance/account/signed-out';

// @ts-ignore
const insuranceAccountRouter = express.Router();

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS, yourDetailsGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS, yourDetailsPost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.CONFIRM_EMAIL, confirmEmailGet);
insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT, confirmEmailResentGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.VERIFY_EMAIL, verifyEmailGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.VERIFY_EMAIL_LINK_EXPIRED, verifyEmailLinkExpiredGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ROOT, signInGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ROOT, signInPost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ENTER_CODE, enterCodeGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ENTER_CODE, enterCodePost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE, requestNewCodeGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE, requestNewCodePost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SIGNED_OUT, signedOutGet);

export default insuranceAccountRouter;

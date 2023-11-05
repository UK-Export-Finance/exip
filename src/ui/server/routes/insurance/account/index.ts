import express from 'express';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as yourDetailsGet, post as yourDetailsPost } from '../../../controllers/insurance/account/create/your-details';
import { get as confirmEmailGet } from '../../../controllers/insurance/account/create/confirm-email';
import { get as resendConfirmEmailGet } from '../../../controllers/insurance/account/create/resend-confirm-email';
import { get as confirmEmailResentGet } from '../../../controllers/insurance/account/create/confirm-email-resent';
import { get as verifyEmailGet } from '../../../controllers/insurance/account/create/verify-email';
import { get as verifyEmailExpiredLinkGet } from '../../../controllers/insurance/account/create/verify-email-expired-link';
import { get as signInGet, post as signInPost } from '../../../controllers/insurance/account/sign-in';
import { get as enterCodeGet, post as enterCodePost } from '../../../controllers/insurance/account/sign-in/enter-code';
import { get as requestNewCodeGet, post as requestNewCodePost } from '../../../controllers/insurance/account/sign-in/request-new-code';
import { get as passwordResetGet, post as passwordResetPost } from '../../../controllers/insurance/account/password-reset';
import { get as passwordResetLinkSentGet } from '../../../controllers/insurance/account/password-reset/link-sent';
import { get as passwordResetExpiredLinkGet, post as passwordResetExpiredLinkPost } from '../../../controllers/insurance/account/password-reset/expired-link';
import { get as newPasswordGet, post as newPasswordPost } from '../../../controllers/insurance/account/password-reset/new-password';
import { get as passwordResetSuccessGet } from '../../../controllers/insurance/account/password-reset/success';
import { get as manageGet } from '../../../controllers/insurance/account/manage';
import { get as signOutGet } from '../../../controllers/insurance/account/sign-out';
import { get as signedOutGet } from '../../../controllers/insurance/account/signed-out';
import { get as suspendedGet, post as suspendedPost } from '../../../controllers/insurance/account/suspended';
import { get as suspendedEmailSentGet } from '../../../controllers/insurance/account/suspended/email-sent';
import { get as suspendedVerifyEmailGet } from '../../../controllers/insurance/account/suspended/verify-email';
import {
  get as suspendedVerifyEmailExpiredLinkGet,
  post as suspendedVerifyEmailExpiredLinkPost,
} from '../../../controllers/insurance/account/suspended/expired-link';
import { get as invalidLinkGet } from '../../../controllers/insurance/account/invalid-link';
import { get as reactivatedGet } from '../../../controllers/insurance/account/reactivated';

// @ts-ignore
const insuranceAccountRouter = express.Router();

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS, yourDetailsGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS, yourDetailsPost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.CONFIRM_EMAIL, confirmEmailGet);
insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.RESEND_CONFIRM_EMAIL, resendConfirmEmailGet);
insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT, confirmEmailResentGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.VERIFY_EMAIL, verifyEmailGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.VERIFY_EMAIL_INVALID_LINK, invalidLinkGet);
insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.CREATE.VERIFY_EMAIL_EXPIRED_LINK, verifyEmailExpiredLinkGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ROOT, signInGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ROOT, signInPost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ENTER_CODE, enterCodeGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ENTER_CODE, enterCodePost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE, requestNewCodeGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE, requestNewCodePost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.ROOT, passwordResetGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.ROOT, passwordResetPost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.LINK_SENT, passwordResetLinkSentGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.EXPIRED_LINK, passwordResetExpiredLinkGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.EXPIRED_LINK, passwordResetExpiredLinkPost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.INVALID_LINK, invalidLinkGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.NEW_PASSWORD, newPasswordGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.NEW_PASSWORD, newPasswordPost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.SUCCESS, passwordResetSuccessGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.MANAGE, manageGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SIGN_OUT, signOutGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SIGNED_OUT, signedOutGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SUSPENDED.ROOT, suspendedGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.SUSPENDED.ROOT, suspendedPost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SUSPENDED.EMAIL_SENT, suspendedEmailSentGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SUSPENDED.VERIFY_EMAIL, suspendedVerifyEmailGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SUSPENDED.VERIFY_EMAIL_EXPIRED_LINK, suspendedVerifyEmailExpiredLinkGet);
insuranceAccountRouter.post(INSURANCE_ROUTES.ACCOUNT.SUSPENDED.VERIFY_EMAIL_EXPIRED_LINK, suspendedVerifyEmailExpiredLinkPost);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.SUSPENDED.VERIFY_EMAIL_INVALID_LINK, invalidLinkGet);

insuranceAccountRouter.get(INSURANCE_ROUTES.ACCOUNT.REACTIVATED_ROOT, reactivatedGet);

export default insuranceAccountRouter;

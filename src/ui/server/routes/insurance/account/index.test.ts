import { get, post } from '../../../test-mocks/mock-router';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { get as yourDetailsGet, post as yourDetailsPost } from '../../../controllers/insurance/account/create/your-details';
import { get as confirmEmailGet } from '../../../controllers/insurance/account/create/confirm-email';
import { get as resendConfirmEmailGet } from '../../../controllers/insurance/account/create/resend-confirm-email';
import { get as confirmEmailResentGet } from '../../../controllers/insurance/account/create/confirm-email-resent';
import { get as verifyEmailGet } from '../../../controllers/insurance/account/create/verify-email';
import { get as verifyEmailLinkExpiredGet } from '../../../controllers/insurance/account/create/verify-email-link-expired';
import { get as signInGet, post as signInPost } from '../../../controllers/insurance/account/sign-in';
import { get as enterCodeGet, post as enterCodePost } from '../../../controllers/insurance/account/sign-in/enter-code';
import { get as requestNewCodeGet, post as requestNewCodePost } from '../../../controllers/insurance/account/sign-in/request-new-code';
import { get as passwordResetGet, post as passwordResetPost } from '../../../controllers/insurance/account/password-reset';
import { get as passwordResetLinkSentGet } from '../../../controllers/insurance/account/password-reset/link-sent';
import { get as passwordResetLinkExpiredGet, post as passwordResetLinkExpiredPost } from '../../../controllers/insurance/account/password-reset/link-expired';
import { get as newPasswordGet, post as newPasswordPost } from '../../../controllers/insurance/account/password-reset/new-password';
import { get as passwordSuccessGet } from '../../../controllers/insurance/account/password-reset/success';
import { get as manageGet } from '../../../controllers/insurance/account/manage';
import { get as signOutGet } from '../../../controllers/insurance/account/sign-out';
import { get as signedOutGet } from '../../../controllers/insurance/account/signed-out';
import { get as suspendedGet, post as suspendedPost } from '../../../controllers/insurance/account/suspended';
import { get as suspendedVerifyEmailGet } from '../../../controllers/insurance/account/suspended/verify-email';
import {
  get as suspendedVerifyEmailLinkExpiredGet,
  post as suspendedVerifyEmailLinkExpiredPost,
} from '../../../controllers/insurance/account/suspended/link-expired';
import { get as suspendedVerifyEmailLinkInvalidGet } from '../../../controllers/insurance/account/invalid-link';
import { get as reactivatedGet } from '../../../controllers/insurance/account/reactivated';

describe('routes/insurance/account', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(23);
    expect(post).toHaveBeenCalledTimes(9);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS, yourDetailsGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS, yourDetailsPost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.CONFIRM_EMAIL, confirmEmailGet);
    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.RESEND_CONFIRM_EMAIL, resendConfirmEmailGet);
    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT, confirmEmailResentGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.VERIFY_EMAIL, verifyEmailGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.VERIFY_EMAIL_LINK_EXPIRED, verifyEmailLinkExpiredGet);
    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ROOT, signInGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ROOT, signInPost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ENTER_CODE, enterCodeGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ENTER_CODE, enterCodePost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE, requestNewCodeGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE, requestNewCodePost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.ROOT, passwordResetGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.ROOT, passwordResetPost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.LINK_SENT, passwordResetLinkSentGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.LINK_EXPIRED, passwordResetLinkExpiredGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.LINK_EXPIRED, passwordResetLinkExpiredPost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.NEW_PASSWORD, newPasswordGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.NEW_PASSWORD, newPasswordPost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.PASSWORD_RESET.SUCCESS, passwordSuccessGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.MANAGE, manageGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGN_OUT, signOutGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGNED_OUT, signedOutGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SUSPENDED.ROOT, suspendedGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SUSPENDED.ROOT, suspendedPost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SUSPENDED.VERIFY_EMAIL, suspendedVerifyEmailGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SUSPENDED.VERIFY_EMAIL_LINK_EXPIRED, suspendedVerifyEmailLinkExpiredGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SUSPENDED.VERIFY_EMAIL_LINK_EXPIRED, suspendedVerifyEmailLinkExpiredPost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SUSPENDED.VERIFY_EMAIL_LINK_INVALID, suspendedVerifyEmailLinkInvalidGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.REACTIVATED_ROOT, reactivatedGet);
  });
});

import { get, post } from '../../../test-mocks/mock-router';
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

describe('routes/insurance/account', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(9);
    expect(post).toHaveBeenCalledTimes(4);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS, yourDetailsGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.YOUR_DETAILS, yourDetailsPost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.CONFIRM_EMAIL, confirmEmailGet);
    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT, confirmEmailResentGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.VERIFY_EMAIL, verifyEmailGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.CREATE.VERIFY_EMAIL_LINK_EXPIRED, verifyEmailLinkExpiredGet);
    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ROOT, signInGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ROOT, signInPost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ENTER_CODE, enterCodeGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.ENTER_CODE, enterCodePost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE, requestNewCodeGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGN_IN.REQUEST_NEW_CODE, requestNewCodePost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.ACCOUNT.SIGNED_OUT, signedOutGet);
  });
});

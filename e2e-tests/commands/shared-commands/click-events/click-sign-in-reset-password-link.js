import { signInPage } from '../../../pages/insurance/account/sign-in';

/**
 * clickSignInResetPasswordLink
 * Click the "reset password" link in the "sign in" form.
 */
const clickSignInResetPasswordLink = () => {
  signInPage.resetPasswordLink().click();
};

export default clickSignInResetPasswordLink;

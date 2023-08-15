import { ACCOUNT } from '../../../constants/account';
import completeAndSubmitSignInAccountForm from './complete-and-submit-sign-in-account-form';
import { backLink } from '../../../pages/shared';

const attemptsToMake = [...Array(ACCOUNT.MAX_AUTH_RETRIES)];

/**
 * completeAndSubmitSignInAccountFormMaximumInvalidRetries
 * Complete and submit the sign in form multiple times,
 * Matching the maximum retries allowed before an account becomes blocked.
 * @param {Object} Object with custom flags
 * - clickBackLinkOnLastAttempt
 * - password
 */
const completeAndSubmitSignInAccountFormMaximumInvalidRetries = ({
  clickBackLinkOnLastAttempt = true,
  password,
}) => {
  attemptsToMake.forEach((item, index) => {
    completeAndSubmitSignInAccountForm({ assertRedirectUrl: false, password });

    const isLastAttempt = index + 1 === attemptsToMake.length;

    if (!isLastAttempt && clickBackLinkOnLastAttempt) {
      backLink().click();
    }
  });
};

export default completeAndSubmitSignInAccountFormMaximumInvalidRetries;

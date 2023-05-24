import { ACCOUNT } from '../../../../constants/account';
import completeAndSubmitSignInAccountForm from './complete-and-submit-sign-in-account-form';
import { backLink } from '../../../e2e/pages/shared';

const attemptsToMake = [...Array(ACCOUNT.MAX_PASSWORD_RESET_TRIES)];

/**
 * completeAndSubmitSignInAccountFormMaximumRetries
 * Complete and submit the sign in form multiple times,
 * Matching the maximum retries allowed before an account becomes blocked.
 */
const completeAndSubmitSignInAccountFormMaximumRetries = () => {
  attemptsToMake.forEach((item, index) => {
    completeAndSubmitSignInAccountForm({ assertRedirectUrl: false });

    const isLastAttempt = index + 1 === attemptsToMake.length;

    if (!isLastAttempt) {
      backLink().click();
    }
  });
};

export default completeAndSubmitSignInAccountFormMaximumRetries;

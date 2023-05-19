import { ACCOUNT } from '../../../../constants/account';
import completeAndSubmitPasswordResetForm from './complete-and-submit-password-reset-form';
import { backLink } from '../../../e2e/pages/shared';

const attemptsToMake = [...Array(ACCOUNT.MAX_PASSWORD_RESET_TRIES)];

/**
 * completeAndSubmitPasswordResetFormMaximumRetries
 * Complete and submit the password reset form multiple times,
 * Matching the maximum retries allowed before an account becomes blocked.
 */
const completeAndSubmitPasswordResetFormMaximumRetries = () => {
  attemptsToMake.forEach((item, index) => {
    completeAndSubmitPasswordResetForm({ assertRedirectUrl: false });

    const isLastAttempt = index + 1 === attemptsToMake.length;

    if (!isLastAttempt) {
      backLink().click();
    }
  });
};

export default completeAndSubmitPasswordResetFormMaximumRetries;

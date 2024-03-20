import { ACCOUNT } from '../../../constants/account';
import completeAndSubmitPasswordResetForm from './complete-and-submit-password-reset-form';

const attemptsToMake = [...Array(ACCOUNT.MAX_AUTH_RETRIES)];

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
      cy.clickBackLink();
    }
  });
};

export default completeAndSubmitPasswordResetFormMaximumRetries;

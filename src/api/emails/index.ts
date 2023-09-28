import dotenv from 'dotenv';
import { confirmEmailAddress } from './confirm-email-address';
import { securityCodeEmail } from './security-code-email';
import { passwordResetLink } from './password-reset-link';
import { reactivateAccountLink } from './reactivate-account-link';
import application from './application';
import { documentsEmail } from './documents';
import { insuranceFeedbackEmail } from './insurance-feedback-email';

dotenv.config();

const sendEmail = {
  confirmEmailAddress,
  securityCodeEmail,
  passwordResetLink,
  reactivateAccountLink,
  application,
  documentsEmail,
  insuranceFeedbackEmail,
};

export default sendEmail;

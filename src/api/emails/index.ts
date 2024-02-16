import dotenv from 'dotenv';
import { confirmEmailAddress } from './confirm-email-address';
import { accessCodeEmail } from './access-code-email';
import { passwordResetLink } from './password-reset-link';
import { reactivateAccountLink } from './reactivate-account-link';
import application from './application';
import { documentsEmail } from './documents';
import { insuranceFeedbackEmail } from './insurance-feedback-email';

dotenv.config();

const sendEmail = {
  confirmEmailAddress,
  accessCodeEmail,
  passwordResetLink,
  reactivateAccountLink,
  application,
  documentsEmail,
  insuranceFeedbackEmail,
};

export default sendEmail;

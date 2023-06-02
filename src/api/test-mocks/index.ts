import { ACCOUNT, ANSWERS, FIELD_IDS } from '../constants';
import encryptPassword from '../helpers/encrypt-password';
import application from './mock-application';
import companySicCode from './mock-company-sic-code';
import { Account } from '../types';

const {
  ACCOUNT: { PASSWORD_RESET_HASH },
} = FIELD_IDS.INSURANCE;

const now = new Date();

export const mockAccount = {
  firstName: 'first',
  lastName: 'last',
  email: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
  ...encryptPassword(String(process.env.MOCK_ACCOUNT_PASSWORD)),
  isVerified: true,
  verificationHash: 'mockVerificationHash',
  verificationExpiry: new Date(now.setMinutes(now.getMinutes() + 1)).toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  [PASSWORD_RESET_HASH]: 'mockResetHash',
  passwordResetExpiry: ACCOUNT.PASSWORD_RESET_EXPIRY(),
} as Account;

export const mockOTP = {
  securityCode: '123456',
  salt: 'mockSalt',
  hash: 'mockHash',
  expiry: new Date(),
};

export const mockApplication = application;

export const mockCompany = {
  companyName: 'Mock company name',
};

export const mockCompanySicCode = companySicCode;

export const mockBuyer = {
  companyOrOrganisationName: 'Mock buyer',
  exporterIsConnectedWithBuyer: ANSWERS.YES,
};

export const mockApplicationDeclaration = {
  agreeToConfidentiality: true,
  agreeToAntiBribery: true,
  hasAntiBriberyCodeOfConduct: ANSWERS.YES,
  willExportWithAntiBriberyCodeOfConduct: ANSWERS.YES,
  agreeToConfirmationAndAcknowledgements: true,
  agreeHowDataWillBeUsed: true,
};

export const mockInsuranceFeedbackEmail = {
  satisfaction: 'satisfied',
  improvement: 'test',
  otherComments: 'comments',
};

export const mockInsuranceFeedback = {
  ...mockInsuranceFeedbackEmail,
  service: 'Insurance',
  referralUrl: 'www.google.com',
  product: 'EXIP',
};

export const mockSendEmailResponse = { success: true, emailRecipient: mockAccount.email };

export const mockUrlOrigin = 'https://mock-origin.com';

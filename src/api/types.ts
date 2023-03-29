import { ExporterUpdateInput } from '.keystone/types'; // eslint-disable-line

interface ApplicationRelationship {
  id: string;
}

interface AccountInput {
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified?: boolean;
  verificationHash: string;
  verificationExpiry: Date;
}

interface Account extends ExporterUpdateInput {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  salt: string;
  hash: string;
  verificationHash: string;
  optSalt?: string;
  optHash?: string;
  otpExpiry?: Date;
  sessionIdentifier?: string;
}

interface Application {
  id: string;
  referenceNumber: number;
  createdAt: string;
  updatedAt: string;
  submissionDeadline: string;
  submissionType: string;
  submissionDate: string;
  status: string;
  previousStatus?: string;
  eligibility: ApplicationRelationship;
  policyAndExport: ApplicationRelationship;
  exporterCompany: ApplicationRelationship;
  exporterCompanyAddress: ApplicationRelationship;
  exporterBusiness: ApplicationRelationship;
  exporterBroker: ApplicationRelationship;
  buyer: ApplicationRelationship;
  sectionReview: ApplicationRelationship;
  declaration: ApplicationRelationship;
}

type BufferEncoding = 'hex' | 'base64' | 'ascii';

interface CompanyResponse {
  id: string;
  applicationId: string;
}

interface EmailResponse {
  success: boolean;
  emailRecipient: string;
}

interface ConnectId {
  id: string;
}

interface ConnectObj {
  connect: ConnectId;
}

interface SicCodes {
  sicCode: string;
  exporterCompany: ConnectObj;
  application: ConnectObj;
}

interface VerifyEmailAddressVariables {
  token: string;
}

interface VerifyEmailAddressResponse {
  success: boolean;
  accountId?: string;
  expired?: boolean;
  emailRecipient?: string;
}

interface SendEmailConfirmEmailAddressVariables {
  exporterId: string;
}

interface AccountCreationVariables {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AccountSignInVariables {
  email: string;
  password: string;
}

interface AccountSignInSendNewCodeVariables {
  accountId: string;
}

interface AccountSignInResponse {
  success: boolean;
  accountId?: string;
}

interface VerifyAccountSignInCodeVariables {
  accountId: string;
  securityCode: string;
}

interface VerifyAccountSignInCodeResponse {
  success: boolean;
  expired?: boolean;
  accountId?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  expires?: string;
  sessionIdentifier?: string;
}

interface VerifyAccountSesssionVariables {
  token: string;
}

interface AddOtpToAccountVariables {
  email: string;
}

interface AddAndGetOtpResponse {
  success: boolean;
  securityCode?: string;
}

interface SubmitApplicationVariables {
  applicationId: string;
}

interface SubmitApplicationResponse {
  success: boolean;
}

export {
  Account,
  AccountCreationVariables,
  AccountInput,
  AccountSignInVariables,
  AccountSignInSendNewCodeVariables,
  AccountSignInResponse,
  AddOtpToAccountVariables,
  AddAndGetOtpResponse,
  Application,
  BufferEncoding,
  CompanyResponse,
  EmailResponse,
  SicCodes,
  SendEmailConfirmEmailAddressVariables,
  SubmitApplicationVariables,
  SubmitApplicationResponse,
  VerifyEmailAddressVariables,
  VerifyEmailAddressResponse,
  VerifyAccountSignInCodeVariables,
  VerifyAccountSignInCodeResponse,
  VerifyAccountSesssionVariables,
};

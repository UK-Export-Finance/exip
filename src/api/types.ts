import { ExporterUpdateInput } from '.keystone/types'; // eslint-disable-line

interface ApplicationRelationship {
  id: string;
}

interface ApplicationExporterCompany {
  id: string;
  companyName?: string;
}

interface ApplicationBuyer {
  id: string;
  companyOrOrganisationName?: string;
  exporterIsConnectedWithBuyer?: string;
}

interface ApplicationDeclaration {
  id: string;
  agreeToConfidentiality?: boolean;
  agreeToAntiBribery?: boolean;
  hasAntiBriberyCodeOfConduct?: boolean;
  willExportWithAntiBriberyCodeOfConduct?: boolean;
  agreeToConfirmationAndAcknowledgements?: boolean;
  agreeHowDataWillBeUsed?: boolean;
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
  passwordResetHash: string;
  passwordResetExpiry: Date;
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
  exporter: ApplicationRelationship;
  policyAndExport: ApplicationRelationship;
  exporterCompany: ApplicationExporterCompany;
  exporterCompanyAddress: ApplicationRelationship;
  exporterBusiness: ApplicationRelationship;
  exporterBroker: ApplicationRelationship;
  buyer: ApplicationBuyer;
  sectionReview: ApplicationRelationship;
  declaration: ApplicationRelationship;
}

interface ApplicationSubmissionEmailVariables {
  emailAddress: string;
  firstName: string;
  referenceNumber: number;
  buyerName: string;
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

interface VerifyEmailAddressVariables {
  token: string;
}

interface VerifyEmailAddressResponse {
  success: boolean;
  accountId?: string;
  expired?: boolean;
  emailRecipient?: string;
}

interface SendExporterEmailVariables {
  exporterId: string;
  referenceNumber?: string;
}

interface SicCodes {
  sicCode: string;
  exporterCompany: ConnectObj;
  application: ConnectObj;
}

interface SuccessResponse {
  success: boolean;
}

interface AccountCreationVariables {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AccountSendEmailPasswordResetLinkVariables {
  email: string;
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
  AccountSendEmailPasswordResetLinkVariables,
  AccountSignInVariables,
  AccountSignInSendNewCodeVariables,
  AccountSignInResponse,
  AddOtpToAccountVariables,
  AddAndGetOtpResponse,
  Application,
  ApplicationBuyer,
  ApplicationDeclaration,
  ApplicationExporterCompany,
  ApplicationSubmissionEmailVariables,
  BufferEncoding,
  CompanyResponse,
  EmailResponse,
  SicCodes,
  SendExporterEmailVariables,
  SubmitApplicationVariables,
  SubmitApplicationResponse,
  SuccessResponse,
  VerifyEmailAddressVariables,
  VerifyEmailAddressResponse,
  VerifyAccountSignInCodeVariables,
  VerifyAccountSignInCodeResponse,
  VerifyAccountSesssionVariables,
};

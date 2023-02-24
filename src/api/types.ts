import { ExporterUpdateInput } from '.keystone/types'; // eslint-disable-line

interface ApplicationEligibility {
  id: string;
}

interface ApplicationPolicyAndExport {
  id: string;
}

interface ApplicationExporterCompany {
  id: string;
}

interface ApplicationExporterCompanyAddress {
  id: string;
}

interface ApplicationExporterBusiness {
  id: string;
}

interface ApplicationExporterBroker {
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
  eligibility: ApplicationEligibility;
  policyAndExport: ApplicationPolicyAndExport;
  exporterCompany: ApplicationExporterCompany;
  exporterCompanyAddress: ApplicationExporterCompanyAddress;
  exporterBusiness: ApplicationExporterBusiness;
  exporterBroker: ApplicationExporterBroker;
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
  accountId: string;
}

export {
  Account,
  AccountCreationVariables,
  AccountInput,
  AccountSignInVariables,
  Application,
  BufferEncoding,
  CompanyResponse,
  EmailResponse,
  SicCodes,
  SendEmailConfirmEmailAddressVariables,
  VerifyEmailAddressVariables,
  VerifyAccountSignInCodeVariables,
  VerifyAccountSignInCodeResponse,
  VerifyAccountSesssionVariables,
  AddOtpToAccountVariables,
};

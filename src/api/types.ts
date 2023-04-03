import { ExporterUpdateInput } from '.keystone/types'; // eslint-disable-line

interface ApplicationRelationship {
  id: string;
}

interface Country extends ApplicationRelationship {
  name: string;
  isoCode: string;
}

interface ApplicationEligibility extends ApplicationRelationship {
  buyerCountry: Country;
  hasCompaniesHouseNumber: boolean;
  otherPartiesInvolved: boolean;
  paidByLetterOfCredit: boolean;
  needPreCreditPeriodCover: boolean;
  wantCoverOverMaxAmount: boolean;
  wantCoverOverMaxPeriod: boolean;
}

interface ApplicationExporter extends ApplicationRelationship {
  email: string;
  firstName: string;
  lastName: string;
}

interface ApplicationExporterCompany {
  id: string;
  companyName?: string;
}

interface ApplicationBuyer extends ApplicationRelationship {
  companyOrOrganisationName?: string;
  address?: string;
  country?: Country;
  registrationNumber?: string;
  website?: string;
  contactFirstName?: string;
  contactLastName?: string;
  contactPosition?: string;
  contactEmail?: string;
  canContactBuyer?: boolean;
  exporterIsConnectedWithBuyer?: string;
  exporterHasTradedWithBuyer?: string;
}

interface ApplicationDeclaration extends ApplicationRelationship {
  agreeToConfidentiality?: boolean;
  agreeToAntiBribery?: boolean;
  hasAntiBriberyCodeOfConduct?: string;
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
}

interface Application {
  id: string;
  referenceNumber: number;
  createdAt: string;
  updatedAt: string;
  submissionDeadline: string;
  submissionType: string;
  submissionDate: Date;
  status: string;
  previousStatus?: string;
  eligibility: ApplicationEligibility;
  exporter: ApplicationExporter;
  policyAndExport: ApplicationRelationship;
  exporterCompany: ApplicationExporterCompany;
  exporterCompanyAddress: ApplicationRelationship;
  exporterBusiness: ApplicationRelationship;
  exporterBroker: ApplicationRelationship;
  buyer: ApplicationBuyer;
  sectionReview: ApplicationRelationship;
  declaration: ApplicationDeclaration;
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

interface CompaniesHouseAddress {
  careOf: string | null;
  premises: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  locality: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
}

interface CompanyHouseResponse {
  companyName: string;
  registeredOfficeAddress: CompaniesHouseAddress;
  companyNumber: string;
  dateOfCreation: string;
  sicCodes: Array<string>;
  success: boolean;
  apiError: boolean;
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

interface Currency {
  name: string;
  isoCode: string;
}

interface NotifyPeronsalisation {
  linkToFile?: string;
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

interface SendExporterEmailVariables {
  exporterId: string;
  referenceNumber?: string;
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
  ApplicationBuyer,
  ApplicationDeclaration,
  ApplicationEligibility,
  ApplicationExporterCompany,
  ApplicationSubmissionEmailVariables,
  BufferEncoding,
  CompanyHouseResponse,
  CompanyResponse,
  Country,
  Currency,
  EmailResponse,
  NotifyPeronsalisation,
  SicCodes,
  SubmitApplicationVariables,
  SubmitApplicationResponse,
  SendExporterEmailVariables,
  VerifyEmailAddressVariables,
  VerifyEmailAddressResponse,
  VerifyAccountSignInCodeVariables,
  VerifyAccountSignInCodeResponse,
  VerifyAccountSesssionVariables,
};

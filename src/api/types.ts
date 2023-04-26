import { ExporterUpdateInput, ExporterCompanyUpdateInput } from '.keystone/types'; // eslint-disable-line

interface SuccessResponse {
  success: boolean;
}

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
  passwordResetHash: string;
  passwordResetExpiry: Date;
  isVerified: boolean;
}

interface ApplicationExporterCompanyAddress extends ApplicationRelationship {
  addressLine1?: string;
  addressLine2?: string;
  careOf?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  premises?: string;
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
  exporterCompanyAddress: ApplicationExporterCompanyAddress;
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

interface DeleteApplicationByReferenceNumberVariables {
  referenceNumber: number;
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

interface CompanyHouseResponse extends SuccessResponse {
  companyName: string;
  registeredOfficeAddress: CompaniesHouseAddress;
  companyNumber: string;
  dateOfCreation: string;
  sicCodes: Array<string>;
  apiError: boolean;
}

interface EmailResponse extends SuccessResponse {
  emailRecipient: string;
}

interface GetCompaniesHouseInformationVariables {
  companiesHouseNumber: string;
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
  industrySectorName: string;
  exporterCompany: ConnectObj;
  application: ConnectObj;
}

interface VerifyEmailAddressVariables {
  token: string;
}

interface VerifyEmailAddressResponse extends SuccessResponse {
  accountId?: string;
  expired?: boolean;
  emailRecipient?: string;
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

interface InsuranceFeedbackVariables {
  satisfaction?: string;
  improvement?: string;
  otherComments?: string;
}

interface AccountSignInResponse extends SuccessResponse {
  accountId?: string;
}

interface VerifyAccountSignInCodeVariables {
  accountId: string;
  securityCode: string;
}

interface VerifyAccountSignInCodeResponse extends SuccessResponse {
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

interface AddAndGetOtpResponse extends SuccessResponse {
  securityCode?: string;
}

interface SendExporterEmailVariables {
  exporterId: string;
  referenceNumber?: string;
}

interface SubmitApplicationVariables {
  applicationId: string;
}

interface UpdateExporterCompanyAndCompanyAddressVariablesData {
  address?: ApplicationExporterCompanyAddress;
  sicCodes?: [string];
  oldSicCodes?: [string];
  industrySectorNames?: [string];
  exporterCompany?: ExporterCompanyUpdateInput;
}

interface UpdateExporterCompanyAndCompanyAddressVariables {
  companyId: string;
  companyAddressId: string;
  data: UpdateExporterCompanyAndCompanyAddressVariablesData;
}

interface Feedback {
  id: string;
  service: string;
  satisfaction: string;
  improvement: string;
  otherComments: string;
  referralUrl: string;
  product: string;
}

interface IndustrySector {
  id?: number;
  ukefIndustryId?: string;
  ukefIndustryName: string;
}

export {
  Account,
  AccountCreationVariables,
  ApplicationExporterCompanyAddress,
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
  ApplicationEligibility,
  ApplicationExporterCompany,
  ApplicationRelationship,
  ApplicationSubmissionEmailVariables,
  BufferEncoding,
  CompanyHouseResponse,
  CompanyResponse,
  Country,
  Currency,
  DeleteApplicationByReferenceNumberVariables,
  EmailResponse,
  Feedback,
  GetCompaniesHouseInformationVariables,
  NotifyPeronsalisation,
  InsuranceFeedbackVariables,
  IndustrySector,
  SicCodes,
  SendExporterEmailVariables,
  SubmitApplicationVariables,
  SuccessResponse,
  UpdateExporterCompanyAndCompanyAddressVariables,
  VerifyEmailAddressVariables,
  VerifyEmailAddressResponse,
  VerifyAccountSignInCodeVariables,
  VerifyAccountSignInCodeResponse,
  VerifyAccountSesssionVariables,
};
